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

    if (currentField === 'category') {
      data = [
        { id: 'two', name: 'Two Wheeler' },
        { id: 'four', name: 'Four Wheeler' },
      ];
    } else if (currentField === 'company') {
      data = companies.map((item: any) => ({ id: item.id, name: item.name }));
    } else if (currentField === 'model') {
      data = models.map((item: any) => ({ id: item.id, name: item.name }));
    } else if (currentField === 'fuelType') {
      data = fuelTypes.map((fuel) => ({ id: fuel, name: fuel }));
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

  // const handleSubmit = async () => {
  //   if (!selectedCategory || !selectedCompany || !selectedModel || !selectedFuelType) {
  //     Alert.alert('Error', 'Please fill all fields.');
  //     return;
  //   }

  //   const inputData = {
  //     category: selectedCategory,
  //     companyId: selectedCompany.id,
  //     companyName: selectedCompany.name,
  //     model: selectedModel,
  //     fuelType: selectedFuelType,
  //   };

  //   try {
  //     const existingData = await AsyncStorage.getItem('vehicleData');
  //     const parsedData = existingData ? JSON.parse(existingData) : [];
  //     const updatedData = [...parsedData, inputData];
  //     await AsyncStorage.setItem('vehicleData', JSON.stringify(updatedData));
  //     navigation.navigate('Data', { inputData });
  //   } catch (error) {
  //     console.error('Error saving data', error);
  //   }
  // };
  const handleSubmit = async () => {
    if (!selectedCategory || !selectedCompany || !selectedModel || !selectedFuelType) {
      Alert.alert("Error", "Please fill all fields.");
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
      const existingData = await AsyncStorage.getItem("vehicleData");
      const parsedData = existingData ? JSON.parse(existingData) : [];
      const updatedData = [...parsedData, inputData];
      await AsyncStorage.setItem("vehicleData", JSON.stringify(updatedData));
      Alert.alert("Success", "Vehicle data saved successfully!");
  
      // Navigate to Data page after data is saved
      navigation.navigate("Data");
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save vehicle data.");
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
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            {loading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : (
              renderModalContent()
            )}
            <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
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
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  modalItemText: { fontSize: 16 },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#ff3131',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InputPage;
