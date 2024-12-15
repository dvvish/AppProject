 

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  Linking,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
 // Assume appropriate styles are defined

//  import React, { useState, useEffect } from 'react';
//  import {
//    ScrollView,
//    View,
//    Text,
//    TextInput,
//    TouchableOpacity,
//    Alert,
//    Modal,
//    Linking,
//  } from 'react-native';
//  import AsyncStorage from '@react-native-async-storage/async-storage';
//  import { useNavigation } from '@react-navigation/native';
//  import styles from './styles'; // Assuming you have a styles file
 
const Registercomp = () => {
  const [inputErrors, setInputErrors] = useState({
    username: '',
    email: '',
    password: '',
    category: '',
    city: '',
    terms: '',
  });

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [college, setCollege] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [referral, setReferral] = useState('');
  const [source, setSource] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isSourceModalVisible, setSourceModalVisible] = useState(false);
  const [policyLink, setPolicyLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
const [check,setCheck] =useState(false);
  const categoryOptions = ['Designing', 'UI/UX', 'Video Editing'];
  const sourceOptions = ['LinkedIn', 'Instagram', 'WhatsApp', 'Other'];

  const navigation = useNavigation();

  useEffect(() => {
    const fetchPolicyLink = async () => {
      try {
        const response = await fetch('https://mechbuddy.pythonanywhere.com/api/home');
        const result = await response.json();
        if (result.others?.policy) {
          setPolicyLink(result.others.policy);
        }
      } catch (error) {
        console.error('Error fetching policy link:', error);
      }
    };

    fetchPolicyLink();
  }, []);

  const validateInputs = () => {
    let errors = {
      username: '',
      email: '',
      password: '',
      category: '',
      city: '',
      terms: '',
    };
    let isValid = true;

    if (!username.trim()) {
      errors.username = 'Username is required.';
      isValid = false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'A valid email is required.';
      isValid = false;
    }
    if (!password.trim()) {
      errors.password = 'Password is required.';
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
    // await AsyncStorage.setItem('userdata');

    if (!validateInputs()) {
      return;
    }

    const userData = {
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      occupation,
      college,
      category,
      city,
      referral,
      source,
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
      if (result.token) {
        console.log(result.token);
        await AsyncStorage.setItem('authToken', result.token);
      }
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
        console.log('userData');
      Alert.alert('Success', 'Registration completed successfully!');
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

        <TextInput
          style={styles.input}
          placeholder="Whatsapp Number "
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#999"
        />
        {inputErrors.username && <Text style={styles.errorText}>{inputErrors.username}</Text>}

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#999"
        />

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
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
        />
        {inputErrors.password && <Text style={styles.errorText}>{inputErrors.password}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Occupation"
          value={occupation}
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

        <TouchableOpacity style={styles.dropdown} onPress={() => setCategoryModalVisible(true)}>
          <Text style={styles.dropdownText}>{category || 'Select Category'}</Text>
        </TouchableOpacity>
        {inputErrors.category && <Text style={styles.errorText}>{inputErrors.category}</Text>}

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
          value={referral}
          onChangeText={setReferral}
          placeholderTextColor="#999"
        />

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
{/* The button is added with disable condition*/}
        <TouchableOpacity
  style={[
    styles.button,
    !isChecked && styles.buttonDisabled, // Apply disabled style if checkbox is not clicked
  ]}
  onPress={handleRegister}
  disabled={!isChecked} // Disable the button if checkbox is not clicked
>
  <Text style={styles.buttonText}>Register</Text>
  <TouchableOpacity/>
 
</TouchableOpacity>

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
 

//export default Registercomp;

// export default Registercomp;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF', // Active button color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC', // Colorless button when disabled
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
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
