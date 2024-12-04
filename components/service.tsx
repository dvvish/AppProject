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
        const serviceComponent = result.find((item: any) => item.component === 'service');

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
   

  
  const handlePress=(service:Service) =>{
    if(service.name=="Parts"){
      navigation.navigate("Parts")
    }
    else{
    navigation.navigate('Servicing');
  }
}

  return (
    <SafeAreaView  > 
    <View style={{flexDirection: 'row',   justifyContent: 'space-between', marginBottom: 9}}> 
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : services.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Services</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            {services.map((service) => {
              // Resolve local or remote icon
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
    width: '99%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    // elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
    paddingBottom:10,
  },
  scrollView: {
    marginBottom: 5,
  },
  card: {
    width: 160,
    height:170,
    marginRight: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
    
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
