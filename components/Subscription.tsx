import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Data from "./Data";
 
const subscriptionPlans = [
  {
    id: 1,
    name: "Basic Service",
    description: "For Light Riders (Up to 12,000 km annually)",
    icon: "https://cdn-icons-png.flaticon.com/128/2921/2921203.png",
    Number: "3",
    price:'1200',
    Duration: "1 Year",
    Service: "Every 4 months",
    ServicesIncluded: "Engine oil and oil filter replacement (at every service).",
    Full: "Brake fluid check and top-up Drive chain adjustment and lubrication.Tire pressure and wear check.General safety inspection (lights, electricals, cables). Ideal for Casual riders who use their bike lightly, mostly for short-distance commuting."
  },
  {
    id: 2,
    name: "Standard Service",
    description: "For Moderate Riders (12,000 to 18,000 km annually)",
    icon: "https://cdn-icons-png.flaticon.com/128/2921/2921225.png",
    Number: "3",
    price:'1600',
    Duration: "1 Year",
    Service: "Every 4 months",
    ServicesIncluded: "Engine oil and oil filter replacement (at every service).",
    Full: "Brake fluid check and top-up Drive chain adjustment and lubrication.Tire pressure and wear check.General safety inspection (lights, electricals, cables). Riders who use their bike regularly, such as for daily commuting and medium-distance trips."
  },
  {
    id: 3,
    name: "Comprehensive Service",
    description: "For Every 12 months and 20000km.",
    icon: "https://cdn-icons-png.flaticon.com/128/2921/2921210.png",
    Number: "3",
    price:"2000",
    Duration: "1 Year",
    Service: "Every 4 months",
    ServicesIncluded: "Engine oil and oil filter replacement (at every service).",
    Full: "Brake fluid check and top-up Drive chain adjustment and lubrication.Tire pressure and wear check.General safety inspection (lights, electricals, cables). Riders who use their bike regularly, such as for daily commuting and medium-distance trips."
  }
];

const Subscription: React.FC = async () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      //const accessToken = await AsyncStorage.getItem('accessToken');
       // Check if access token exists
       const token = await AsyncStorage.getItem('Token')
      setIsLoggedIn(!!token); // If access token exists, the user is logged in
      setLoading(false); // Set loading to false after checking the token
    };

    checkLoginStatus();
  }, []);
  const data = await AsyncStorage.getItem('vehicleData');

  const handleSubscribe = (planId: number) => {
    if (isLoggedIn) {
      // If the user is logged in, navigate to the subscription details page
      console.log(`Subscribed to plan: ${planId}`);
      console.log(data);
      if(data){
        navigation.navigate('payment');
      }
      //else navigate to inputpage//
      else{
      navigation.navigate('InputPage');}
    } else {
      // If not logged in, navigate to the LoginUser page
      navigation.navigate("LoginUser");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ff3131" style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View>
        <Text style={styles.title}>Subscription Plans</Text>

        <FlatList
          data={subscriptionPlans}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.planContainer}>
              <Image source={{ uri: item.icon }} style={styles.icon} />
              <View style={styles.planDetails}>
                <Text style={styles.planName}>{item.name}</Text>
                <Text style={styles.planDescription}>{item.description}</Text>
                <Text style={styles.planName}>Rupees : {item.price}/-</Text>
                <TouchableOpacity
                  style={styles.subscribeButton}
                  onPress={() => handleSubscribe(item.id)}
                >
                  <Text style={styles.subscribeButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  planContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  planDetails: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  planDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  subscribeButton: {
    backgroundColor: "#FF3131",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  subscribeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Subscription;
