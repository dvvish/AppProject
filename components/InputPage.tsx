import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const InputPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [models, setModels] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);

  const navigation = useNavigation();

  // Fetch companies based on selected category
  const fetchCompanies = async (category) => {
    setLoadingCompanies(true);
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
      setLoadingCompanies(false);
    }
  };

  // Fetch models based on selected company and category
  const fetchModels = async (companyId) => {
    if (!companyId || !selectedCategory) return;
    setLoadingModels(true);
    try {
      const apiEndpoint = `https://mechbuddy.pythonanywhere.com/api/vehicle/${companyId}/${selectedCategory === 'two' ? 'bike' : 'car'}/all`;
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setModels(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load models.');
      console.error(error);
    } finally {
      setLoadingModels(false);
    }
  };

  // Handle category selection and fetch relevant companies
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCompany(''); // Reset company and models when category changes
    setModels([]);
    fetchCompanies(category);
  };

  // Handle company selection and fetch relevant models
  const handleCompanySelect = (companyId) => {
    setCompany(companyId);
    fetchModels(companyId);
  };

  const handleSubmit = () => {
    if (!selectedCategory || !company) {
      Alert.alert('Error', 'Please select all options.');
      return;
    }

    const inputData = {
      category: selectedCategory,
      company,
    };

    // Navigate or handle data submission
    navigation.navigate('NextScreen', { data: inputData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Details</Text>

      {/* Category Selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Category:</Text>
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={[
              styles.categoryOption,
              selectedCategory === 'two' && styles.categoryOptionSelected,
            ]}
            onPress={() => handleCategorySelect('two')}
          >
            <Image
              source={require('../assets/icons/motorbike.png')}
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryText}>Two Wheeler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryOption,
              selectedCategory === 'four' && styles.categoryOptionSelected,
            ]}
            onPress={() => handleCategorySelect('four')}
          >
            <Image
              source={require('../assets/icons/car.png')}
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryText}>Four Wheeler</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Company Selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Company:</Text>
        <View style={styles.pickerContainer}>
          {loadingCompanies ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <Picker
              selectedValue={company}
              onValueChange={(itemValue) => handleCompanySelect(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Company" value=" Enter the companies " />
              {companies.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          )}
        </View>
      </View>

      {/* Models Selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Model:</Text>
        <View style={styles.pickerContainer}>
          {loadingModels ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <Picker
              selectedValue={company}
              onValueChange={(itemValue) => setCompany(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Model" value="" />
              {models.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.name} />
              ))}
            </Picker>
          )}
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  categoryOption: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 120,
  },
  categoryOptionSelected: {
    borderColor: '#007bff',
    backgroundColor: '#e6f0ff',
  },
  categoryIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#ff3131',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default InputPage;
