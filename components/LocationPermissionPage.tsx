import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, PermissionsAndroid, Alert, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const  LocationPermissionPage = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS permissions are handled automatically
  };

  const getLocation = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required to fetch your location.');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        Alert.alert('Error', error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Geolocation Example</Text> */}
      <Button title="Get Location" onPress={getLocation} />
      {location && (
        <Text style={styles.locationText}>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  locationText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default  LocationPermissionPage;
