import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const localIcons = (serviceName: string) => {
  const icons: { [key: string]: any } = {
    service: require("../assets/icons/servicebyslot.png"),
    onspot: require("../assets/icons/onspot.png"),
    quick_services: require("../assets/icons/quick_services.png"),
    detailing: require("../assets/icons/detailing.png"),
    wheel: require("../assets/icons/wheel.png"),
    wash: require("../assets/icons/wash.png"),
    denting: require("../assets/icons/paint.png"),
    paint: require("../assets/icons/painting.png"),
    "denting&painting": require("../assets/icons/denting&painting.png"),
  };
  return icons[serviceName] || require("../assets/icons/s1.png");
};

const Servicing: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchServices = async () => {
    try {
      const response = await fetch("https://mechbuddy.pythonanywhere.com/api/service");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Icon rotation animation
  const rotateValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 4000, // Adjust speed for continuous rotation
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Interpolated rotation value
  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleServicePress = (serviceName: string): void => {
    navigation.navigate("VendorList", { service: serviceName });
  };

  const ServiceBox = ({ service }: { service: any }) => {
    const scaleValue = new Animated.Value(1);

    const onPressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 1.3,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableWithoutFeedback
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => service.isActive && handleServicePress(service.name)}
      >
        <Animated.View
          style={[
            styles.serviceBox,
            !service.isActive && styles.inactiveService,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <Animated.Image
            source={localIcons(service.iconname)}
            style={[
              styles.icon,
              { transform: [{ rotate: rotateInterpolate }] },
              !service.isActive && styles.inactiveIcon,
            ]}
          />
          <Text
            style={[
              styles.serviceText,
              !service.isActive && styles.inactiveText,
            ]}
          >
            {service.name}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
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
        <View style={styles.gridContainer}>
          {services.map((service, index) => (
            <ServiceBox key={service.id || index} service={service} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    padding: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  serviceBox: {
    width: "30%",
    height: 140,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  inactiveService: {
    opacity: 0.5,
  },
  icon: {
    width: 70,
    height: 70,
    marginTop: 5,
  },
  inactiveIcon: {
    opacity: 0.5,
  },
  serviceText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  inactiveText: {
    color: "#ccc",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#666",
  },
});

export default Servicing;
