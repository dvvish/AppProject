// VendorList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types'; // Import the types
import { icons } from '../constants';

type VendorListProps = NativeStackScreenProps<RootStackParamList, 'VendorList'>;

const VendorList: React.FC<VendorListProps> = ({ navigation }) => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vendor data from API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('https://mechbuddy.pythonanywhere.com/api/vendor-list');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // Navigate to VendorDetails
  const handlePress = (id: string): void => {
    console.log("---------------------------------------------------------");
    navigation.navigate('VendorDetails', { vendorId: id }); // Passing vendorId to the next screen
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loaderText}>Loading vendors...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={vendors}
        keyExtractor={(item) => item.id.toString()} // Assuming id is a unique identifier
        renderItem={({ item }) => {
          const imageUrl = item.logo
            ? { uri: `https://mechbuddy.pythonanywhere.com${item.logo}` }
          
            : icons.logo;

          return (
            <TouchableOpacity style={styles.vendorItem} onPress={() => handlePress(item.id)}>
              <Image source={imageUrl} style={styles.vendorImage} />
              <View style={styles.vendorInfo}>
                <Text style={styles.vendorName}>{item.name}</Text>
                <Text style={styles.vendorDescription}>
                  {item.aboutus || 'No description available.'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  listContent: {
    paddingVertical: 10,
  },
  vendorItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    margin: 4,
  },
  vendorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#f0f0f0',
  },
  vendorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  vendorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  vendorDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default VendorList;
