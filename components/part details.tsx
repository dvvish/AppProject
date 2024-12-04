import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const   PartDetails = {
  id: '1',
  name: 'Engine Oil',
  description: 'High-quality engine oil for smooth performance. Your vehicle\'s engine is its heart and just like any vital organ, it needs the best care to function at its peak. High-quality engine oil plays a crucial role in ensuring that your engine is well protected and performs at its best.',
  imageUri: 'https://cdn-icons-png.flaticon.com/128/7199/7199770.png',
};

const  PartDetailss: React.FC = () => {
  const navigation = useNavigation(); // Initialize useNavigation

  const handleBackPress = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={handleBackPress}
        style={{
          position: 'absolute',
          top: Platform.OS === 'ios' ? 10 : 70,
          left: 10,
          zIndex: 10,
          padding: 5,
        }}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/271/271220.png' }}
          style={{
            width: 10,
            height: 10,
            padding: 10,
          }}
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Part Details */}
        <Image source={{ uri:  PartDetails.imageUri }} style={styles.partImage} />
        <Text style={styles.partName}>{ PartDetails.name}</Text>
        <Text style={styles.partDescription}>{ PartDetails.description}</Text>
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    padding: 20,
    paddingTop: 120,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  partImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  partName: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  partDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  varietiesHeading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  varietyCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    marginRight: 15,
  },
  varietyImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  offerBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#FF6347", // Tomato color for offers
    borderRadius: 5,
    padding: 5,
  },
  offerText: {
    color: "#fff",
    fontSize: 12,
  },
  varietyInfo: {
    flex: 1,
  },
  varietyName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  varietyPrice: {
    fontSize: 16,
    color: "#4CAF50", // Green color for price
  },
});

export default  PartDetailss;
 