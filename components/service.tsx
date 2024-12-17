import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Predefine the mapping for local icons
const localIconMapping: Record<string, any> = {
  'services': require('../assets/icons/services.png'),
  'parts': require('../assets/icons/s6.png'),
};

const service = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mechbuddy.pythonanywhere.com/api/home');
        const result = await response.json();

        // Extract the 'service' component
        const serviceComponent = result.components.find((item: any) => item.component === 'service');

        if (serviceComponent && serviceComponent.data) {
          setServices(serviceComponent.data);
        } else {
          console.warn('No service component found in the API.');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePress = async (service: Service) => {
    const vehicleData = await AsyncStorage.getItem('vehicleData');
    if (vehicleData) {
      if (service.name === 'Parts') {
        navigation.navigate('Parts');
      } else if (service.name === 'Servicing') {
        navigation.navigate('Servicing');
      }
    } else {
      navigation.navigate('InputPage');
    }
  };

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 9 }}>
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : services.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>Services</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {services.map((service) => {
                  const localIcon = localIconMapping[service.icon];
                  const iconSource = localIcon
                    ? localIcon
                    : { uri: `https://mechbuddy.pythonanywhere.com/media/${service.icon}` };

                  return (
                    <TouchableOpacity
                      key={service.id}
                      style={styles.card}
                      onPress={() => handlePress(service)}
                      activeOpacity={0.8}
                    >
                      <Image source={iconSource} style={styles.icon} />
                      <Text style={styles.name}>{service.name}</Text>
                      <Text style={styles.description}>{service.description}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </>
          ) : (
            <Text style={styles.errorText}>No services available</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '105%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    // elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    marginRight:10,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    padding:20,
  },
  scrollView: {
    marginBottom: 5,
  },
  card: {
    width: 140,
    height: 150,
    marginRight: 20,
    padding: 15,
    
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2, // Clear, uniform border width
    

     // Adjust width to fit 2 cards per row with spacing
        marginBottom: 20, // Spacing between rows
        backgroundColor: '#fff',
        borderRadius: 18,
        elevation: 3,
    borderColor: '#fcfcfc', // Glowing border color (light blue)
    shadowColor: '#4A90E2', // Glow effect color
    shadowOffset: { width: 0, height: 0 }, // Even shadow on all sides
    shadowRadius: 10, // Glow intensity
    shadowOpacity: 0.5,
  },
  

  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
    fontSize: 14,
  },
});

export default service;
