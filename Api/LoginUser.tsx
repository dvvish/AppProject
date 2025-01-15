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
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import { icons } from '../constants'; // Replace with your icons file

const LoginUser = (): React.JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Configure Google Sign-In
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'AIzaSyBtEX7UYVIq0agwxM3L1RoiQCGole7wasc', // Replace with your Web Client ID
    });
  }, []);

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

      const responseData = await response.json();
      console.log('Login Response:', responseData);

      const { token, profile } = responseData;

      if (!token || !profile) {
        throw new Error('Token or profile not received from the server.');
      }

      await saveToken(token);
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

  const handleGoogleSignIn = async () => {
    try {
      // Check Google Play Services
      await GoogleSignin.hasPlayServices();

      // Get Google User Info
      const { idToken } = await GoogleSignin.signIn();

      if (!idToken) {
        throw new Error('Google Sign-In failed. No ID Token received.');
      }

      // Sign In to Firebase with Google Credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const firebaseUser = await auth().signInWithCredential(googleCredential);

      console.log('Firebase User:', firebaseUser);

      const token = firebaseUser.user.uid;
      const profile = {
        email: firebaseUser.user.email,
        displayName: firebaseUser.user.displayName,
        photoURL: firebaseUser.user.photoURL,
      };

      await saveToken(token);
      await AsyncStorage.setItem('Profile', JSON.stringify(profile));

      Alert.alert('Success', 'Google Sign-In successful!');
      navigation.navigate('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'Google Sign-In was cancelled.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('In Progress', 'Google Sign-In is in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services not available.');
      } else {
        console.error('Google Sign-In Error:', error);
        Alert.alert('Error', 'Failed to sign in with Google.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={icons.logo}
        style={{ width: 200, height: 200, alignSelf: 'center', marginTop: -130 }}
      />
      <Text style={styles.title}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        placeholderTextColor="#999"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#ff3131" />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
        </>
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
  googleButton: {
    backgroundColor: '#4285F4',
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
  googleButtonText: {
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
