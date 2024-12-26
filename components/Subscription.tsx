import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const subscriptionPlans = [
  {
    id: 1,
    name: "Basic Service",
    description: "For Light Riders (Up to 12,000 km annually)",
    icon: "https://cdn-icons-png.flaticon.com/128/2921/2921203.png",
    price: "1200",
    Duration: "1 Year",
    ServicesIncluded: "Engine oil and oil filter replacement (at every service).",
    Full: "Brake fluid check and top-up, Drive chain adjustment and lubrication, Tire pressure and wear check, General safety inspection. Ideal for Casual riders who use their bike lightly, mostly for short-distance commuting.",
  },
  {
    id: 2,
    name: "Standard Service",
    description: "For Moderate Riders (12,000 to 18,000 km annually)",
    icon: "https://cdn-icons-png.flaticon.com/128/2921/2921225.png",
    price: "1600",
    Duration: "1 Year",
    ServicesIncluded: "Engine oil and oil filter replacement (at every service).",
    Full: "Brake fluid check and top-up, Drive chain adjustment and lubrication, Tire pressure and wear check, General safety inspection. Riders who use their bike regularly for commuting and medium-distance trips.",
  },
  {
    id: 3,
    name: "Comprehensive Service",
    description: "For Every 12 months and 20,000 km.",
    icon: "https://cdn-icons-png.flaticon.com/128/2921/2921210.png",
    price: "2000",
    Duration: "1 Year",
    ServicesIncluded: "Engine oil and oil filter replacement (at every service).",
    Full: "Brake fluid check and top-up, Drive chain adjustment and lubrication, Tire pressure and wear check, General safety inspection. Ideal for regular riders covering long distances.",
  },
];

const Subscription: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedCard, setExpandedCard] = useState<number | null>(null); // To track expanded card
  const navigation = useNavigation();
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("Token");
      setIsLoggedIn(!!token);
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  const handleSubscribe = async (planId: number) => {
    const data = await AsyncStorage.getItem("vehicleData");

    if (isLoggedIn) {
      console.log(`Subscribed to plan: ${planId}`);
      console.log(data);
      if (data) {
        navigation.navigate("payment");
      } else {
        navigation.navigate("InputPage");
      }
    } else {
      navigation.navigate("LoginUser");
    }
  };

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#ff3131"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 120,
          paddingBottom: 20,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View>
        <Text style={styles.title}>Subscription Plans</Text>

        <FlatList
          data={subscriptionPlans}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Animated.View
              style={[
                styles.planContainer,
                expandedCard === item.id && styles.expandedContainer,
                { transform: [{ scale }] },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() =>
                  setExpandedCard(expandedCard === item.id ? null : item.id)
                }
              >
                <Image source={{ uri: item.icon }} style={styles.icon} />
                <View style={styles.planDetails}>
                  <Text style={styles.planName}>{item.name}</Text>
                  <Text style={styles.planDescription}>{item.description}</Text>
                  <Text style={styles.planPrice}>Rupees: {item.price}/-</Text>
                  {expandedCard === item.id && (
                    <>
                      <Text style={styles.additionalInfo}>
                        Duration: {item.Duration}
                      </Text>
                      <Text style={styles.additionalInfo}>
                        Services Included: {item.ServicesIncluded}
                      </Text>
                      <Text style={styles.additionalInfo}>{item.Full}</Text>
                    </>
                  )}
                  <TouchableOpacity
                    style={styles.subscribeButton}
                    onPress={() => handleSubscribe(item.id)}
                  >
                    <Text style={styles.subscribeButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  planContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 25,
    padding: 20,
    marginBottom: 20, // Spacing between cards
    marginHorizontal: 10, // Horizontal margin for better spacing
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 7,
    paddingInline:20,
  },
  expandedContainer: {
    backgroundColor:"#b3b3b3", // Highlight expanded card
    padding: 35,
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
  planPrice: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  additionalInfo: {
    fontSize: 14,
    color: "black",
    marginBottom: 10,
  },
  subscribeButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  subscribeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Subscription;
