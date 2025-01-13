import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
 
import { icons } from '../constants'; // Replace with your icons file

 
const LoginUser = (): React.JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Refs to store timeout IDs for debouncing
  const usernameTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const passwordTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const saveToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('Token', token);
      console.log('Token saved successfully');
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  };

  const saveProfile = async (profile: any) => {
    try {
      await AsyncStorage.setItem('Profile', JSON.stringify(profile));
      console.log('Profile saved successfully');
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const userData = { username, password };

      const response = await fetch(
        'https://mechbuddy.pythonanywhere.com/api/auth/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid username or password.');
      }

      // Parse response JSON safely
      const responseData = await response.json();
      console.log('Login Response:', responseData);

      const { token, profile } = responseData;

      if (!token || !profile) {
        throw new Error('Token or profile not received from the server.');
      }

      // Save the token and profile to AsyncStorage
      await saveToken(token);
      await saveProfile(profile);

      Alert.alert('Success', 'Login successful!');

      const data = await AsyncStorage.getItem('vehicleData');
      if (data) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('VehicleForm');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError((err as Error).message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced input handlers
  const handleUsernameChange = (value: string) => {
    if (usernameTimeoutRef.current) {
      clearTimeout(usernameTimeoutRef.current); // Clear previous timeout
    }
    usernameTimeoutRef.current = setTimeout(() => {
      setUsername(value); // Update state after debounce delay
    }, 300);
  };

  const handlePasswordChange = (value: string) => {
    if (passwordTimeoutRef.current) {
      clearTimeout(passwordTimeoutRef.current); // Clear previous timeout
    }
    passwordTimeoutRef.current = setTimeout(() => {
      setPassword(value); // Update state after debounce delay
    }, 300);
  };

  return (
    <View style={styles.container}>
      <Image
        source={icons.logo}
        style={{ width: 200, height: 200, alignSelf: 'center',marginTop:-130 }}
      />
      <Text style={styles.title}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={handleUsernameChange}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={handlePasswordChange}
        placeholderTextColor="#999"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#ff3131" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.registerText}>
        New user?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('RegisterUser')}
        >
          Register here
        </Text>
      </Text>
    </View>
  );
};

 


export default LoginUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    color: '#ff3131',
    textAlign: 'center',
    marginBottom: 20,
    alignItems:'center',
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
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#ff3131',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
// function debounce(arg0: (value: string) => void, arg1: number): any {
//   throw new Error('Function not implemented.');
// }

