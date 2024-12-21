import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const path = '../assets/icons/';

// Function to map service names to local icons
const localIcons = (serviceName: string) => {
  const icons: { [key: string]: any } = {
    'service': require('../assets/icons/servicebyslot.png'),
    'onspot': require('../assets/icons/onspot.png'),
    'quick_services': require('../assets/icons/quick_services.png'),
    'detailing': require('../assets/icons/detailing.png'),
    "wheel": require('../assets/icons/wheel.png'),
    'wash': require('../assets/icons/wash.png'),
     'denting': require('../assets/icons/paint.png'),
    'paint': require('../assets/icons/painting.png'),
    'denting&painting': require('../assets/icons/denting&painting.png'),
    // Add more mappings as needed
  };

  // Return the corresponding icon or a default fallback icon
  return icons[serviceName] || require('../assets/icons/s1.png');
  console.log(`../assets/icons/${serviceName}.png`);
  // return `../assets/icons/${serviceName}.png`;  
};

const Servicing: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchServices = async () => {
    try {
      const response = await fetch('https://mechbuddy.pythonanywhere.com/api/service');
      const data = await response.json();
      setServices(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleServicePress = (serviceName: string): void => {
    // Navigate to VendorList and pass the service name as a parameter
    navigation.navigate('VendorList', { service: serviceName });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading services...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          {/* <Text style={styles.heading}>Select a Service</Text> */}
        </View>
        <View style={styles.gridContainer}>
          {services.map((service, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.serviceBox,
                !service.isActive && styles.inactiveService, // Apply inactive style
              ]}
              onPress={() => service.isActive && handleServicePress(service.name)} // Only when it is active
            >
              <Image
                source={localIcons(service.iconname)} // Always use local icons
                // source={{ uri: "../assets/icons/" + service.iconname + ".png"}} // Always use local icons
                // source={localIcons(service.iconname)} // Always use local icons
                // source={require(`../assets/icons/${service.iconname}.png`)} // Always use local icons
                style={[
                  styles.icon,
                  !service.isActive && styles.inactiveIcon, // Apply inactive icon style
                ]}
              />
              <Text
                style={[
                  styles.serviceText,
                  !service.isActive && styles.inactiveText, // Apply inactive text style
                ]}
              >
                {service.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.divider} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  heading: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  serviceBox: {
    width: '30%',
    height: 120,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inactiveService: {
    opacity: 0.5, // Reduced opacity for inactive services
  },
  icon: {
    width: 70,
    height: 65,
    marginTop: 5,
  },
  inactiveIcon: {
    opacity: 0.5, // Reduced opacity for inactive icons
  },
  serviceText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  inactiveText: {
    color: '#ccc', // Faded text for inactive services
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 15,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
});

export default Servicing;
