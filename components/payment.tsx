import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import navigation from "./Naviagtion";
import { useNavigation } from "@react-navigation/native";

const Payment = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [paymentOptions] = useState([
    { name: "Credit Card", icon: "https://example.com/credit-card-icon.png" },
    { name: "Debit Card", icon: "https://example.com/debit-card-icon.png" },
    { name: "PayPal", icon: "https://example.com/paypal-icon.png" },
    { name: "UPI", icon: "https://example.com/upi-icon.png" },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);
const navigation= useNavigation();
  useEffect(() => {
    const fetchSelectedVehicle = async () => {
      try {
        const data = await AsyncStorage.getItem("selectedVehicle");
        if (data) {
          setSelectedVehicle(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error fetching selected vehicle", error);
      }
    };
    fetchSelectedVehicle();
  }, []);

  const calculateTotal = () => {
    // Assume additional charges are fixed for simplicity.
    const additionalCharges = 1000; // Example: tax or delivery fee
    // const vehiclePrice = selectedVehicle
    //   ? parseInt(selectedVehicle.price.replace("₹", ""))
    //   : 0;
  //  return vehiclePrice + additionalCharges;
  };

  const handleConfirmPress = () => {
    console.log("Payment confirmed with method:", selectedOption);
    Alert.alert("thanks for payment");
    // Add payment logic here
  };
  const handlepress =()=>{
    navigation.navigate('Data');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Payment Title */}
        <Text style={styles.title}>Payment Options</Text>
        

        {/* Selected Vehicle Details */}
        <Text style={styles.sectionTitle}>Selected Vehicle</Text>
        <TouchableOpacity onPress={handlepress}> 
        <Image style={{height:25,width:25,marginLeft:170,marginTop:-40,}}
        source={require('../assets/icons/add.png')}/>
        
        </TouchableOpacity>
         
        {selectedVehicle ? (
          <View style={styles.itemContainer}>
             <Image source={{ uri: selectedVehicle.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{selectedVehicle.model}</Text>
              <Text style={styles.itemPrice}>Price: {selectedVehicle.price}</Text>
              <Text style={styles.itemCategory}>
                Category: {selectedVehicle.category}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.noData}>No vehicle selected.</Text>
        )}

        {/* Total Price */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total (Including Charges): ₹{2200}</Text>
        </View>

        {/* Payment Options */}
        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        {paymentOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedOption(option.name)}
            style={[
              styles.optionContainer,
              selectedOption === option.name && styles.selectedOption,
            ]}
          >
            <Image source={{ uri: option.icon }} style={styles.optionImage} />
            <Text style={styles.optionText}>{option.name}</Text>
          </TouchableOpacity>
        ))}

        {/* Confirm Button */}
        <TouchableOpacity
          onPress={handleConfirmPress}
          style={[
            styles.confirmButton,
            !selectedOption && styles.disabledButton, // Disable button if no payment option selected
          ]}
          disabled={!selectedOption}
        >
          <Text style={styles.confirmButtonText}>
            {selectedOption ? "Confirm Payment" : "Select a Payment Method"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f4f4f4" },
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 15 },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: { width: 70, height: 70, marginRight: 10, borderRadius: 5 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  itemPrice: { fontSize: 14, color: "#333", marginBottom: 5 },
  itemCategory: { fontSize: 14, color: "#666" },
  noData: { fontSize: 16, color: "#999", textAlign: "center" },
  totalContainer: {
    marginVertical: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  totalText: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#f0f0f0",
  },
  selectedOption: { borderColor: "#007BFF", backgroundColor: "#E8F4FF" },
  optionImage: { width: 30, height: 30, marginRight: 10 },
  optionText: { fontSize: 16, fontWeight: "500" },
  confirmButton: {
    marginTop: 20,
    backgroundColor: "#ff3131",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#d3d3d3" },
  confirmButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default Payment;
