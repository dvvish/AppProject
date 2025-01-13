import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Data = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Fetch all vehicle data from AsyncStorage
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await AsyncStorage.getItem('vehicleData');
      if (data) {
        setDataList(JSON.parse(data));
        console.log('Data fetched successfully');
      } else {
        setDataList([]);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      Alert.alert('Error', 'Failed to fetch vehicle data.');
    } finally {
      setLoading(false);
    }
  };

  // Handle selecting a vehicle item (saves and overrides previous selection)
  const handleItemPress = async (item) => {
    try {
      // Save the selected vehicle and overwrite the previous one
      await AsyncStorage.setItem('vehicleData', JSON.stringify([item])); // This will overwrite previous data
      Alert.alert('Success', 'Vehicle data updated successfully!');
      
      // Log the saved vehicle data
      console.log('Saved vehicle data:', item);

      // Optionally, navigate to Home or other screens as needed
      navigation.navigate('Home'); // Navigate to Home screen
    } catch (error) {
      console.error('Error saving selected vehicle:', error);
      Alert.alert('Error', 'Failed to save selected vehicle.');
    }
  };

  // Handle deleting a vehicle item
  const handleDelete = async (item) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this vehicle?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Remove the selected vehicle from the list
              const updatedList = dataList.filter((vehicle) => vehicle !== item);
              setDataList(updatedList);

              // Save the updated list back to AsyncStorage
              await AsyncStorage.setItem('vehicleData', JSON.stringify(updatedList));

              Alert.alert('Success', 'Vehicle deleted successfully.');
            } catch (error) {
              console.error('Error deleting vehicle:', error);
              Alert.alert('Error', 'Failed to delete vehicle.');
            }
          },
        },
      ]
    );
  };

  // Navigate to the "VehicleForm" screen to add a new vehicle
  const addVehicle = () => {
    navigation.navigate('VehicleForm');
  };

  // Refresh data whenever the screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Vehicles</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : dataList.length > 0 ? (
        <FlatList
          data={dataList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity onPress={() => handleItemPress(item)}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>Category: {item.category}</Text>
                  <Text style={styles.itemText}>Company: {item.companyName}</Text>
                  <Text style={styles.itemText}>Model: {item.model}</Text>
                  <Text style={styles.itemText}>Fuel Type: {item.fuelType}</Text>
                </View>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noData}>No vehicles added yet.</Text>
      )}

      {/* Add Vehicle Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={addVehicle}
      >
        <Text style={styles.addButtonText}>Add New Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemDetails: {
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  noData: {
    fontSize: 18,
    color: '#777',
    marginTop: 20,
    textAlign: 'center',
  },
  addButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Data;
