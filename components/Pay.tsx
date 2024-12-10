import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Pay = (): React.JSX.Element => {
  const [userData, setUserData] = useState<any>(null);
  const [paymentQr, setPaymentQr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user data from AsyncStorage
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          setUserData(JSON.parse(data));
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch payment QR from API
    const fetchPaymentQr = async () => {
      try {
        const response = await fetch('https://mechbuddy.pythonanywhere.com/api/home');
        const result = await response.json();

        // Extract payment_qr from the API response
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
          <Text style={{textAlign:"center",alignItems:'center',marginTop:-50,marginBottom:20,fontWeight:'bold'}}>*Scan this Qr for Payment </Text>
          {userData ? (
            <View>
              <Text style={styles.heading}>User Information</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{userData.name}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{userData.email}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>UTR ID:</Text>
                <Text style={styles.value}>{userData.utr}</Text>
              </View>
              {/* Add more fields as necessary */}
              <Button
                title="Proceed to Payment"
                onPress={() => navigation.navigate('ComingSoon')} // Assuming 'ComingSoon' is a screen in your navigator
              />
            </View>
          ) : (
            <View>
              <Text style={styles.message}>No user data found. Please register first.</Text>
              <Button
                title="Go to Register"
                onPress={() => navigation.navigate('Register')} // Assuming 'Register' is a screen in your navigator
              />
            </View>
          )}
        </>
        
      )}
      <Text style={styles.divider}>OR</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  divider:{
alignItems:'center',
textAlign:'center',
paddingTop:20,
fontSize:25,
fontWeight:'bold'
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
  heading: {
    fontSize: 24,
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
});

export default Pay;
