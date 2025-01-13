import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

const ServiceDescription = () => {
  const service = {
    id: 1,
    name: "Car Detailing",
    image: "https://img.freepik.com/free-photo/hand-car-mechanic-with-wrench-auto-repair-garage_146671-19710.jpg?t=st=1736418007~exp=1736421607~hmac=8be69fb6c4a85af81e82b3076c1da618102cfc55695acfbcee5a7ebc5f4feb49&w=900",
    description:
      "Our car detailing service ensures that your vehicle looks and feels brand new. From exterior polishing to interior cleaning, we've got it covered.",
    price: "120",
    benefits: [
      "Enhances vehicle appearance.",
      "Protects paint and upholstery.",
      "Increases resale value.",
      "Improves overall driving experience.",
    ],
    features: [
      "Exterior wash and wax.",
      "Interior vacuuming and steam cleaning.",
      "Tire cleaning and polishing.",
      "Glass and dashboard cleaning.",
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Service Image */}
      <Image source={{ uri: service.image }} style={styles.serviceImage} />

      {/* Service Name */}
      <Text style={styles.serviceName}>{service.name}</Text>

      {/* Service Price */}
      <Text style={styles.servicePrice}>Price: {service.price}</Text>

      {/* Service Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.serviceDescription}>{service.description}</Text>

      {/* Benefits Section */}
      <Text style={styles.sectionTitle}>Benefits</Text>
      {service.benefits.map((benefit, index) => (
        <View key={index} style={styles.bulletPoint}>
          <Text style={styles.bulletText}>•</Text>
          <Text style={styles.bulletContent}>{benefit}</Text>
        </View>
      ))}

      {/* Features Section */}
      <Text style={styles.sectionTitle}>Features</Text>
      {service.features.map((feature, index) => (
        <View key={index} style={styles.bulletPoint}>
          <Text style={styles.bulletText}>•</Text>
          <Text style={styles.bulletContent}>{feature}</Text>
        </View>
      ))}

      {/* Action Button */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText} >Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    alignItems: "center",
  },
  serviceImage: {
    width: 180,
    height: 180,
    borderRadius: 15,
    marginBottom: 20,
  },
  serviceName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 10,
  },
  bulletPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginRight: 8,
  },
  bulletContent: {
    fontSize: 16,
    color: "#555",
    flexShrink: 1,
  },
  bookButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServiceDescription;
