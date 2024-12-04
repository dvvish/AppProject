import React, { useId } from 'react';
import { View, Image, FlatList, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { icons } from '../constants';
 
import VendorDetails from './VendorDetails';

const { width } = Dimensions.get('window');

// Sample data with dynamic offers for a mechanic store
const data = [
  { id: '1', icon: icons.s1, label: "Service by Slot", description: "Quick and efficient oil change." },
  { id: '2', icon: icons.s2, label: 'On Spot Servicing', description: 'We will deliver best on spot servicing' },
  { id: '3', icon: icons.s3, label: 'Wash', description: 'Get new tires for a safer drive' },
  { id: '4', icon: icons.s4, label: 'Wheel', description: 'Keep your battery in good health' },
  { id: '5', icon: icons.s5, label: 'Detailing', description: 'Diagnose engine issues accurately' },
  { id: '6', icon: icons.s6, label: 'Modification', description: 'Smooth shifting and performance' },
];

const  QuickServices = () => {
  const navigation = useNavigation();

  // Handle card press and navigate to VendorDetail screen, passing necessary data
  const handleCardPress = ( ) => {
    navigation.navigate(VendorDetails );  // Pass vendor data to VendorDetail
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:30,paddingBottom:30,fontWeight:"bold"}}>Quick Services</Text>
      <FlatList
      
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        )}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:180,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 20,
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  icon: {
    width: 50,
    height: 50,
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

export default  QuickServices;
