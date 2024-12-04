import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const  AvailableVendors: React.FC = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Fetch vendor data from API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('https://mechbuddy.pythonanywhere.com/api/vendor-list');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVendors(data); // Assuming API returns a well-structured array of vendors
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // const handlePress = (vendorId: string) => {
  //   navigation.navigate('VendorDetails', { vendorId });
  // };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading vendors...</Text>
      </View>
    );
  }

  function handlePress(id: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={vendors}
        keyExtractor={(item) => item.id.toString()} // Assuming `id` is a unique identifier
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.vendorItem} onPress={() => handlePress(item.id)}>
            <Image source={{ uri: item.image }} style={styles.vendorImage} />
            <View style={styles.vendorInfo}>
              <Text style={styles.vendorName}>{item.name}</Text>
              <Text style={styles.vendorDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 0 : 20,
    padding: 5,
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vendorItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    elevation: 2,
  },
  vendorImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
  },
  vendorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  vendorName: {
    fontSize: 15,
    fontWeight: '600',
  },
  vendorDescription: {
    fontSize: 12,
    color: '#700',
  },
});

export default  AvailableVendors;
