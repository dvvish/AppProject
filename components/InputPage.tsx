import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const InputPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<{ id: string; name: string } | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedFuelType, setSelectedFuelType] = useState<string | null>(null);

  const [companies, setCompanies] = useState([]);
  const [models, setModels] = useState([]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState<string | null>(null);

  const navigation = useNavigation();

  const fetchCompanies = async (category: string) => {
    setLoading(true);
    try {
      const apiEndpoint =
        category === 'two'
          ? 'https://mechbuddy.pythonanywhere.com/api/company/oem/vehicle/bike'
          : 'https://mechbuddy.pythonanywhere.com/api/company/oem/vehicle/car';
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load companies.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModels = async (companyId: string) => {
    if (!companyId || !selectedCategory) return;
    setLoading(true);
    try {
      const apiEndpoint = `https://mechbuddy.pythonanywhere.com/api/vehicle/${companyId}/${selectedCategory === 'two' ? 'bike' : 'car'}/all`;
      const response = await fetch(apiEndpoint);
      const data = await response.json();

      setModels(data);
      const fuelTypes = Array.from(new Set(data.map((item: any) => item.fuel_name)));
      setFuelTypes(fuelTypes);
    } catch (error) {
      Alert.alert('Error', 'Failed to load models.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedCompany(null);
    setSelectedModel(null);
    setSelectedFuelType(null);
    setCompanies([]);
    setModels([]);
    setFuelTypes([]);
    fetchCompanies(category);
  };

  const handleCompanySelect = (company: { id: string; name: string }) => {
    setSelectedCompany(company);
    setSelectedModel(null);
    setSelectedFuelType(null);
    fetchModels(company.id);
  };

  const handleModalOpen = (field: string) => {
    setCurrentField(field);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setCurrentField(null);
  };

  const handleItemSelect = (item: any) => {
    if (currentField === 'category') {
      handleCategorySelect(item.id);
    } else if (currentField === 'company') {
      handleCompanySelect({ id: item.id, name: item.name });
    } else if (currentField === 'model') {
      setSelectedModel(item.name);
    } else if (currentField === 'fuelType') {
      setSelectedFuelType(item.name);
    }
    handleModalClose();
  };

  const renderModalContent = () => {
    let data = [];
    let isCentered = false;

    if (currentField === 'category') {
      data = [
        { id: 'two', name: 'Two Wheeler' },
        { id: 'four', name: 'Four Wheeler' },
      ];
      if (data.length === 2) {
        isCentered = true; // Center the items if only two categories
      }
    } else if (currentField === 'company') {
      data = companies.map((item: any) => ({ id: item.id, name: item.name }));
    } else if (currentField === 'model') {
      data = models.map((item: any) => ({ id: item.id, name: item.name }));
    } else if (currentField === 'fuelType') {
      data = fuelTypes.map((fuel) => ({ id: fuel, name: fuel }));
      if (data.length === 2) {
        isCentered = true; // Center the items if only two fuel types
      }
    }

    if (isCentered) {
      return (
        <View style={styles.centeredModal}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.centeredItem}
              onPress={() => handleItemSelect(item)}
            >
              <Text style={styles.modalItemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => handleItemSelect(item)}
          >
            <Text style={styles.modalItemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !selectedCompany || !selectedModel || !selectedFuelType) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    const inputData = {
      category: selectedCategory,
      companyId: selectedCompany.id,
      companyName: selectedCompany.name,
      model: selectedModel,
      fuelType: selectedFuelType,
    };

    try {
      const existingData = await AsyncStorage.getItem('vehicleData');
      const parsedData = existingData ? JSON.parse(existingData) : [];
      const updatedData = [...parsedData, inputData];
      await AsyncStorage.setItem('vehicleData', JSON.stringify(updatedData));
      navigation.navigate('Data', { inputData });
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Details</Text>
      <TouchableOpacity
        style={styles.fieldContainer}
        onPress={() => handleModalOpen('category')}
      >
        <Text style={styles.fieldText}>
          {selectedCategory
            ? `Category: ${selectedCategory === 'two' ? 'Two Wheeler' : 'Four Wheeler'}`
            : 'Select Category'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fieldContainer}
        onPress={() => handleModalOpen('company')}
        disabled={!selectedCategory}
      >
        <Text style={styles.fieldText}>
          {selectedCompany ? selectedCompany.name : 'Select Company'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fieldContainer}
        onPress={() => handleModalOpen('model')}
        disabled={!selectedCompany}
      >
        <Text style={styles.fieldText}>
          {selectedModel || 'Select Model'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fieldContainer}
        onPress={() => handleModalOpen('fuelType')}
        disabled={!selectedModel}
      >
        <Text style={styles.fieldText}>
          {selectedFuelType || 'Select Fuel Type'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            renderModalContent()
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  fieldContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  fieldText: { fontSize: 16, color: '#555' },
  submitButton: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ff3131',
    paddingVertical: 13,
    borderRadius: 28,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalContainer: { flex: 1, padding: 10, backgroundColor: '#fff' },
  modalItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  modalItemText: { fontSize: 16 },
  centeredModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  centeredItem: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});

export default InputPage;
