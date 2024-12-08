import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Data = () => {
  const [dataList, setDataList] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const data = await AsyncStorage.getItem('vehicleData');
      if (data) {
        setDataList(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error retrieving data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addVehicle = () => {
    navigation.navigate('InputPage');
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('vehicleData');
      setDataList([]);
    } catch (error) {
      console.error('Error clearing data', error);
    }
  };

  const handleItemPress = async (item: never) => {
    try {
      // Store selected data in AsyncStorage
      await AsyncStorage.setItem('selectedCategory', item.category);
      await AsyncStorage.setItem('selectedVehicle', JSON.stringify(item));
      // Navigate to the VendorList page
    //  navigation.navigate('VendorList', { selectedData: item });
    navigation.navigate('Home');
    } catch (error) {
      console.error('Error storing selected data', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submitted Data</Text>
      {dataList.length > 0 ? (
        <FlatList
          data={dataList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <View style={styles.item}>
                <Text>Category: {item.category}</Text>
                <Text>Company: {item.companyName}</Text>
                <Text>Model: {item.model}</Text>
                <Text>Fuel Type: {item.fuelType}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noData}>No data available.</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={clearData}>
        <Text style={styles.buttonText}>Clear Data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={addVehicle}>
        <Text style={styles.buttonText}>Add More Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  noData: { textAlign: 'center', fontSize: 18, color: '#555' },
  button: {
    marginTop: 20,
    backgroundColor: '#ff3131',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default Data;
