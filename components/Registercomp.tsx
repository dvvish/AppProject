import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { icons } from '../constants/index'; // Adjust the path as necessary

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

  const navigation = useNavigation();

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
      // API call to register the user
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

      // Navigate to the home screen
      navigation.navigate('Home'); // Replace 'Home' with the actual route name in your app
    } catch (err: any) {
      console.error('Error during registration:', err);
      setError(err.message || 'An unknown error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image source={icons.logo} style={{ width: 38, height: 38, marginTop: 12 }} /> */}
      <Text style={styles.title}>Registration</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Full Name"
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
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        placeholderTextColor="#999"
      />
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
        placeholder="Source"
        value={source}
        onChangeText={setSource}
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
    </View>
  );
};

export default Registercomp;

const styles = StyleSheet.create({
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
    marginBottom:  10,
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
