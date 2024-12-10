import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
//import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import { ScrollView } from 'react-native';

type RegisterParams = {
  username: string;
  email: string;
};

const Registercomp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [occupations, setOccupation] = useState('');
  const [college, setCollege] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [referal, setReferal] = useState('');
  const [source, setSource] = useState('');
  const [utr, setUtr] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isSourceModalVisible, setSourceModalVisible] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  // Options for Category and Source
  const categoryOptions = ['Designing', 'UI/UX', 'Video Editing'];
  const sourceOptions = ['LinkedIn', 'Instagram', 'WhatsApp', 'Other'];

  // Populate username and email from AsyncStorage
  useEffect(() => {
    const fetchData = async () => {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedEmail = await AsyncStorage.getItem('email');

      if (savedUsername) setName(savedUsername);
      if (savedEmail) setEmail(savedEmail);
    };

    fetchData();
  }, []);

  const handleRegister = async () => {
    setError(null); // Clear previous errors

    const userData = {
      name,
      email,
      contact,
      occupations,
      college,
      category,
      city,
      referal,
      source,
      utr,
    };

    try {
      const response = await fetch('https://mechbuddy.pythonanywhere.com/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.message || 'Registration failed. Please try again.');
      }

      const result = await response.json();
      Alert.alert('Success', 'Registration completed successfully!');
      console.log('Response:', result);

      navigation.navigate('Home'); // Replace 'Home' with the actual route name
    } catch (err: any) {
      console.error('Error during registration:', err);
      setError(err.message || 'An unknown error occurred.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={contact}
        onChangeText={setContact}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        value={occupations}
        onChangeText={setOccupation}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="College"
        value={college}
        onChangeText={setCollege}
        placeholderTextColor="#999"
      />

      {/* Category Field */}
      <TouchableOpacity style={styles.dropdown} onPress={() => setCategoryModalVisible(true)}>
        <Text style={styles.dropdownText}>{category || 'Select Category'}</Text>
      </TouchableOpacity>

      {/* Source Field */}
      <TouchableOpacity style={styles.dropdown} onPress={() => setSourceModalVisible(true)}>
        <Text style={styles.dropdownText}>{source || 'Select Source'}</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Referral Code"
        value={referal}
        onChangeText={setReferal}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Transaction details/ UTR NO."
        value={utr}
        onChangeText={setUtr}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Category Modal */}
      <Modal visible={isCategoryModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Category</Text>
            {categoryOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => {
                  setCategory(option);
                  setCategoryModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Source Modal */}
      <Modal visible={isSourceModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Source</Text>
            {sourceOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => {
                  setSource(option);
                  setSourceModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
    </ScrollView>
  );
};

export default Registercomp;

const styles = StyleSheet.create({
  
  
  
  scrollContainer:{
    flexGrow:1,
  }
  ,
  
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#f9f9f9',
    color: '#333',
    marginHorizontal: 20,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
    marginTop:10,
  },
  
  
  
  
  modalOverlay: {
    flex: 1,
   justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
     alignItems:'center',
    paddingLeft:30
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    alignContent:'center',
    textAlign:'center',
    paddingTop:30,
    alignItems:'center',
  },
  modalOption: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontFamily: 'JakartaBold',
    color: '#ff3131',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#f9f9f9',
    color: '#333',
    marginHorizontal: 20,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff3131',
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 50,
    alignItems: 'center',
    marginTop: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'JakartaBold',
  },
});
