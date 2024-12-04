import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../constants";

const Parts: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://mechbuddy.pythonanywhere.com/api/part-list");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryPress = (category: any) => {
    navigation.navigate("PartDetails", { id: category.id });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading categories...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Parts Categories</Text>
      <Text style={styles.label}>Select a Category:</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.dropdown}
        >
          <Picker.Item label="All" value="all" />
          {categories.map((category: any) => (
            <Picker.Item key={category.id} label={category.name} value={category.alias} />
          ))}
          
        </Picker>
      </View>
      <View style={styles.gridContainer}>
        {categories
          .filter(
            (category) =>
              selectedCategory === "all" || category.alias === selectedCategory
          )
          .map((category: any) => (
            <TouchableOpacity
              key={category.id}
              style={styles.serviceBox}
              onPress={() => handleCategoryPress(category)}
            >
              <Image
                // source={{ uri: "https://cdn-icons-png.flaticon.com/128/7199/7199770.png"}} 
                source={icons.s13}// Static image URL
                style={styles.icon}
              />
              <Text style={styles.serviceText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 10 : 40,
    left: 10,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  backButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
  },
  heading: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 12,
    color: "#555",
    marginBottom: 10,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  },
  dropdown: {
    height: 50,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceBox: {
    width: "30%",
    height: 120,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  icon: {
    width: 65,
    height: 55,
    marginTop: 10,
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },
});

export default Parts;
