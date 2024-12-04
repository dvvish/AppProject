import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { icons } from '../constants';
import RegisterUser from './RegisterUser';

const LoginUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const saveTokens = async (accessToken: string, refreshToken: string) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      console.log('Tokens saved successfully');
    } catch (error) {
      console.error('Failed to save tokens:', error);
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

      const result = await response.json();
      const { access, refresh, message } = result;

      if (!access || !refresh) {
        throw new Error('Tokens not received from the server.');
      }

      // Save tokens to AsyncStorage
      await saveTokens(access, refresh);

      Alert.alert('Success', message || 'Login successful!');

      // Navigate to the home screen or main app screen
      navigation.navigate('Home');
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
        <Text style={styles.loginLink} onPress={() => navigation.navigate(RegisterUser)}>
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
    fontFamily: 'JakartaBold',
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
