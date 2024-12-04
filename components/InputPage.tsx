import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import navigation from './Naviagtion';
import { useNavigation } from '@react-navigation/native';

const InputPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(''); // Two Wheeler or Four Wheeler
  const [type] = useState('');
  const [company, setCompany] = useState('');
  const [model, setModel] = useState('');
  const [variant, setVariant] = useState('');
const navigation = useNavigation();
  const handleSubmit = () => {
    if (!selectedCategory ||  !company || !model || !variant) {
      Alert.alert('Error', 'Please select all options.');
      return;
    }

    const inputData = {
      category: selectedCategory,
       
      company,
      model,
      variant,
    };

  
    navigation.navigate('InputData', { data: inputData });
  };

  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>Vehicle Details</Text>
  {/* <View style={{height:10,width:10}}>
        <Image source={require("../assets/icons/logo.png")}></Image>
      </View> */}
      {/* Category Selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Category:</Text>
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={[
              styles.categoryOption,
              selectedCategory === 'two' && styles.categoryOptionSelected,
            ]}
            onPress={() => setSelectedCategory('two')}
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
            onPress={() => setSelectedCategory('four')}
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
          <Picker
            selectedValue={company}
            onValueChange={(itemValue) => setCompany(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Company" value="" />
            <Picker.Item label="Honda" value="honda" />
            <Picker.Item label="Toyota" value="toyota" />
            <Picker.Item label="Yamaha" value="yamaha" />
            <Picker.Item label="Suzuki" value="suzuki" />
          </Picker>
        </View>
      </View>

      {/* Model Selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Model:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={model}
            onValueChange={(itemValue) => setModel(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Model" value="" />
            <Picker.Item label="Civic" value="civic" />
            <Picker.Item label="Activa" value="activa" />
            <Picker.Item label="RAV4" value="rav4" />
            <Picker.Item label="Gixxer" value="gixxer" />
          </Picker>
        </View>
      </View>

      {/* Variant Selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Variant:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={variant}
            onValueChange={(itemValue) => setVariant(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Variant" value="" />
            <Picker.Item label="Deluxe" value="deluxe" />
            <Picker.Item label="Sport" value="sport" />
            <Picker.Item label="Standard" value="standard" />
            <Picker.Item label="Premium" value="premium" />
          </Picker>
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
    borderRadius:4,
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
