import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { icons } from '../constants/index'; // Adjust path as necessary

import App from '../App';
import Servicing from '../components/servicing';
import { ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterUser = () => {

  // type RegisterParams = {
  //   username: string;
  //   email: string;
  // };
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  // const route = useRoute<RouteProp<{ params: RegisterParams }, 'params'>>();

  const handleRegister = async () => {
    await AsyncStorage.setItem('username', username);
await AsyncStorage.setItem('email', email);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Prepare user data for API
      const userData = {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password2: confirmPassword,
      };

      // Send user data to the API
      const response = await fetch('https://mechbuddy.pythonanywhere.com/api/auth/registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to register. Please try again.');
      }

      // Log confirmation message to console on success
      console.log('Registration successful:', userData);
        navigation.navigate('Home');
     // navigation.navigate('Register', { username, email });
      //to save username and email
      await AsyncStorage.setItem('username', 'email');
       
     // navigation.goBack();
      // Navigate to the home page
     } catch (err) {
      console.log('Error during registration:', err);
      const errorMessage = typeof err.message === 'string' ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    }
  };

  return (
    <ScrollView> 
    <View style={styles.container}>
      <Image source={icons.logo} style={{ width: 200, height: 200, alignSelf: 'center' }} />
      <Text style={styles.title}>Register</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        Already registered?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate(LoginUser)}>
          Login here
        </Text>
      </Text>
    </View>
    </ScrollView>
    
  );
};

export default RegisterUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginTop:-15,
  },
  title: {
    fontSize: 28,
    fontFamily: 'JakartaBold',
    color: '#ff3131',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:-10,
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
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'JakartaBold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 14,
    fontFamily: 'JakartaLight',
  },
  loginLink: {
    color: '#ff3131',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
