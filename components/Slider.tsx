import React, { useEffect, useState } from 'react';
import { View, Animated, FlatList, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Function to map service names to local icons
const localIcons = (serviceName: string) => {
  const icons: { [key: string]: any } = {
    "Service by slot booking": require('../assets/icons/servicebyslot.png'),
    "On spot service": require('../assets/icons/onspot.png'),
    "Quick Service": require('../assets/icons/quick_services.png'),
    Detailing: require('../assets/icons/detailing.png'),
    Wheel: require('../assets/icons/wheel.png'),
    Wash: require('../assets/icons/wash.png'),
    Denting: require('../assets/icons/paint.png'),
    Painting: require('../assets/icons/painting.png'),
    "Denting & Painting": require('../assets/icons/denting&painting.png'),
  };

  return icons[serviceName] || require('../assets/icons/s1.png');
};

const Slider: React.FC = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchServices = async () => {
    try {
      const response = await fetch('https://mechbuddy.pythonanywhere.com/api/service');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCardPress = () => {
    navigation.navigate('VendorList'); // Ensure VendorDetails is registered in your navigator
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        renderItem={({ item }) => {
          const translateY = new Animated.Value(0);

          const handlePressIn = () => {
            Animated.spring(translateY, {
              toValue: 10,
              useNativeDriver: true,
            }).start();
          };

          const handlePressOut = () => {
            Animated.spring(translateY, {
              toValue: 2,
              useNativeDriver: true,
            }).start();
          };

          return (
            <TouchableWithoutFeedback
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCardPress}
            >
              <View style={styles.card}>
                <Animated.Image
                  source={localIcons(item.name)}
                  style={[styles.icon, { transform: [{ translateY }] }]}
                />
                <Text style={styles.label}>{item.name}</Text>
                <Text style={styles.description}>
                  {item.description || 'Description not available'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:10,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    marginTop:10,
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 10,
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  icon: {
    width: 70,
    height: 60,
    resizeMode: 'contain',
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    marginTop: 4,
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});

export default Slider;
