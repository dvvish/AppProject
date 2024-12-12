import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Registercomp = () => {
  const [inputErrors, setInputErrors] = useState({
    name: '',
    email: '',
    contact: '',
    category: '',
    city: '',
    terms: '',
  });
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
  const [isChecked, setIsChecked] = useState(false);
  const [policyLink, setPolicyLink] = useState<string | null>(null);

  const categoryOptions = ['Designing', 'UI/UX', 'Video Editing'];
  const sourceOptions = ['LinkedIn', 'Instagram', 'WhatsApp', 'Other'];

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedEmail = await AsyncStorage.getItem('email');
        //  await AsyncStorage.setItem('userData')
      if (savedUsername) setName(savedUsername);
      if (savedEmail) setEmail(savedEmail);

      // Fetch policy link from the API
      try {
        const response = await fetch('https://mechbuddy.pythonanywhere.com/api/home');
        const result = await response.json();

        if (result.others && result.others.policy) {
          setPolicyLink(result.others.policy);
        } else {
          console.warn('No policy link found in the API.');
        }
      } catch (error) {
        console.error('Error fetching policy link:', error);
      }
    };

    fetchData();
  }, []);

  const validateInputs = () => {
    let errors = { name: '', email: '', contact: '', category: '', city: '', terms: '' };
    let isValid = true;

    if (!name.trim()) {
      errors.name = 'Name is required.';
      isValid = false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'A valid email is required.';
      isValid = false;
    }
    if (!contact.trim() || !/^\d{10}$/.test(contact)) {
      errors.contact = 'Contact must be a 10-digit number.';
      isValid = false;
    }
    if (!category) {
      errors.category = 'Category selection is required.';
      isValid = false;
    }
    if (!city.trim()) {
      errors.city = 'City is required.';
      isValid = false;
    }
    if (!isChecked) {
      errors.terms = 'You must agree to the terms and conditions.';
      isValid = false;
    }

    setInputErrors(errors);
    return isValid;
  };

  const handleRegister = async () => {
    setError(null);

    if (!validateInputs()) {
      return;
    }

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
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
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

      Alert.alert('Success', 'Registration completed successfully!');
      // const Data =await AsyncStorage.setItem('userData');
     
      navigation.navigate('pay');
      
       
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

        {/* Registration Form */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />
        {inputErrors.name && <Text style={styles.errorText}>{inputErrors.name}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
        />
        {inputErrors.email && <Text style={styles.errorText}>{inputErrors.email}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Contact"
          value={contact}
          onChangeText={setContact}
          placeholderTextColor="#999"
        />
        {inputErrors.contact && <Text style={styles.errorText}>{inputErrors.contact}</Text>}

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
        {inputErrors.category && <Text style={styles.errorText}>{inputErrors.category}</Text>}

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
        {inputErrors.city && <Text style={styles.errorText}>{inputErrors.city}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Referral Code"
          value={referal}
          onChangeText={setReferal}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your Transaction details/UTR NO."
          value={utr}
          onChangeText={setUtr}
          placeholderTextColor="#999"
        />

        {/* Terms and Conditions Checkbox */}
        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={styles.checkbox}>
            {isChecked && <View style={styles.checkboxTick} />}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text
              style={styles.link}
              onPress={() => policyLink && Linking.openURL(policyLink)}
            >
              Terms and Conditions
            </Text>
          </Text>
        </View>
        {inputErrors.terms && <Text style={styles.errorText}>{inputErrors.terms}</Text>}

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
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxTick: {
    width: 12,
    height: 12,
    backgroundColor: '#4caf50',
  },
  termsText: {
    fontSize: 14,
    marginBottom: 10,
  },
  link: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
  scrollContainer: {
    flexGrow: 1,
  },
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
    marginTop: 10,
    alignItems: 'center',
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
    borderRadius: 30,
    paddingLeft: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    alignContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    alignItems: 'center',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 12,
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
