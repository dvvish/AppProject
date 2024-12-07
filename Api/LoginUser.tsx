import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { icons } from '../constants';

const LoginUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const saveToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('Token', token);
      console.log('Token saved successfully');
    } catch (error) {
      console.error('Failed to save token:', error);
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

      const response = await fetch('https://mechbuddy.pythonanywhere.com/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid username or password.');
      }

      const { token } = await response.json();

      if (!token) {
        throw new Error('Token not received from the server.');
      }

      // Save the token to AsyncStorage
      await saveToken(token);

      Alert.alert('Success', 'Login successful!');

      // Navigate to the home screen or main app screen
     // navigation.navigate('Home');
    } catch (err) {
      console.error('Error during login:', err);
      setError((err as Error).message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={icons.logo} style={{ width: 200, height: 200, alignSelf: 'center' }} />
      <Text style={styles.title}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    color: '#ff3131',
    textAlign: 'center',
    marginBottom: 20,
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
