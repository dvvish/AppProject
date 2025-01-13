import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const sliderData = [
  { id: 1, title: " Wheel" },
  { id: 2, title: "Wash" },
  { id: 3, title: "PPF" },
  { id: 4, title: "Service 4" },
  { id: 5, title: "Service 5" },
  { id: 6, title: "Service 6" },
];

const cardData = [
  {
    id: 1,
    name: "Car Detailing",
    image: "https://cdn-icons-png.flaticon.com/128/2921/2921203.png",
    description: "Comprehensive cleaning and restoration of your car.",
    price: "1200",
  },
  {
    id: 2,
    name: "Car Wash",
    image: "https://cdn-icons-png.flaticon.com/128/2921/2921225.png",
    description: "Exterior and interior cleaning of your car.",
    price: "1600",
},
  {
    id: 3,
    name: "Car Painting",
    image: "https://cdn-icons-png.flaticon.com/128/2921/2921210.png",
    description: "Get your car repainted with a fresh look.",
    price: "2000",
  },
];

const Vendorservices = () => {
  const [expandedIndex, setExpandedIndex] = useState(null); // Tracks which slider item is expanded
  const [currentIndex, setCurrentIndex] = useState(0); // For slider auto-scroll
  const navigation = useNavigation();
  const sliderRef = useRef<FlatList<any>>(null);

  // Automatic slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= sliderData.length ? 0 : prevIndex + 1
      );
    }, 30000); // 3-second interval
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollToOffset({
        offset: currentIndex * (width / 3),
        animated: true,
      });
    }
  }, [currentIndex]);

  // Handle slider item click to expand cards
  const handleSliderItemPress = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse if already expanded
    } else {
      setExpandedIndex(index); // Expand clicked slider item
    }
  };

  const renderExpandedCards = () => (
    <View>
      <FlatList
        data={cardData} // Cards for expanded view
        keyExtractor={(item) => `card-${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity  onPress={() =>  navigation.navigate('Servicedescription')} >
           
          <View style={styles.expandedCard}>
            
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <Text style={styles.cardTitle}>Price: {item.price}</Text>
            </View>
            
            </View>
            </TouchableOpacity>
          
          
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderSliderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.sliderItem}
      onPress={() => handleSliderItemPress(index)}
    >
      <Text style={styles.sliderText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const Navbar = () => (
    <View style={styles.navbar}>
      {/* Slider in Navbar */}
      <FlatList
        ref={sliderRef}
        horizontal
        data={sliderData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSliderItem}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width / 3}
        decelerationRate="fast"
        style={styles.slider}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Navbar with Slider */}
      <Navbar />

      {/* Display expanded cards when a slider item is pressed */}
      {expandedIndex !== null && (
        <View style={styles.expandedContainer}>{renderExpandedCards()}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  navbar: {
    backgroundColor: "#c6b9b9",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  slider: {
    height: 30,
  },
  sliderItem: {
    width: width / 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 5,
    elevation: 3,
  },
  sliderText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  expandedContainer: {
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 10,
  },
  expandedCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    padding: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default Vendorservices;
