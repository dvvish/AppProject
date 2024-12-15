import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Alert,
  Linking,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// import React, { useEffect, useState } from 'react';
// import {
//   ScrollView,
//   View,
//   Text,
//   Image,
//   TextInput,
//   Button,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   Linking,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
//import styles from './styles'; // Assuming you have a `styles` file

const Pay = (): React.JSX.Element => {
  const [userData, setUserData] = useState<any>(null);
  const [paymentQr, setPaymentQr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [utr, setUtr] = useState<string>(''); // State for UTR number
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          setUserData(JSON.parse(data));
          console.log(data);
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchPaymentQr = async () => {
      try {
        const response = await fetch('https://mechbuddy.pythonanywhere.com/api/home');
        const result = await response.json();

        if (result.others && result.others.payment_qr) {
          setPaymentQr(result.others.payment_qr);
        } else {
          console.warn('No payment QR found in the API.');
        }
      } catch (error) {
        console.error('Error fetching payment QR:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchPaymentQr();
  }, []);

  const submitTransaction = async () => {
    if (!utr.trim()) {
      Alert.alert('Error', 'Please enter a valid UTR number.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken'); // Retrieve the token from AsyncStorage

      if (!token) {
        Alert.alert('Error', 'Authentication token not found. Please log in again.');
        navigation.navigate('Register'); // Redirect to registration if no token is found
        return;
      }
      const _data = JSON.stringify({ utr: utr });
      console.log("sending Data " + _data);
      const response = await fetch('https://mechbuddy.pythonanywhere.com/api/register-transaction/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Token " + token, // Include the token in the Authorization header
        },
        body: _data
      });

      if (response.ok) {
        const result = await response.json();
        console.log(response);
        Alert.alert('Success', result.message);
        navigation.navigate('Home');
        setUtr('');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'Failed to register transaction.');
      }
    } catch (error) {
      console.error('Error submitting UTR:', error);
      Alert.alert('Error', 'An error occurred while submitting the transaction.' + error);
    }
  };

  const handlePhoneCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`).catch(() =>
      Alert.alert('Error', 'Unable to open the dialer.')
    );
  };

  const handleEmail = (email: string) => {
    const subject = 'Support Request';
    const body = 'Hello, I need help with...';
    const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(emailUrl).catch(() =>
      Alert.alert('Error', 'Unable to open the email client.')
    );
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {paymentQr && (
            <View style={styles.qrContainer}>
              <Image source={{ uri: paymentQr }} style={styles.qrImage} />
            </View>
          )}
          <Text style={styles.qrText}>*Scan this QR for Payment</Text>
           
      <Text style={styles.oldPrice}>Rs : 249/-</Text>
      <Text style={styles.currentPrice}>Rs : 199/-</Text>
      <Text  style={styles.nrText}>*For first 100 registration</Text>
          {userData && (
            <View  >
              <Text >User Information</Text>
              <Text  >Username: {userData.username}</Text>
              <Text  >Email: {userData.email}</Text>
            </View>
          )}

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Enter Transaction ID / UTR:</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter UTR / Transaction Id"
            value={utr}
            onChangeText={setUtr}
            placeholderTextColor="#999"
          />
          <Button title="Submit UTR" onPress={submitTransaction} />
          <Text style={styles.heading}>
            For any type of queries please Contact:
          </Text>
          <TouchableOpacity onPress={() => handlePhoneCall('8435776053')}>
            <Text style={styles.phoneNumber}>
              Contact Support: 8435776053
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEmail('support@mechbuddy.in')}>
            <Text style={styles.emailText}>
              Email Support: support@mechbuddy.in
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default Pay;


  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  currentPrice: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    textAlign:'center',
    marginRight: 5,
  },
  oldPrice: {
    textAlign:'center',
    fontSize: 22,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  qrText: {
    marginTop:-22,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  nrText:{
    fontSize:10,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  phoneNumber: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  emailText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default Pay;
