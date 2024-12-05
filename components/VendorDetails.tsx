import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Subscription from './Subscription';
import { AirbnbRating } from 'react-native-ratings';

const VendorDetails: React.FC = ({ route }: any) => {
  const navigation = useNavigation();
  const vendorId = route.params?.vendorId; // Vendor ID passed from the previous page
  const [vendorData, setVendorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await fetch(`https://mechbuddy.pythonanywhere.com/api/vendor/${vendorId}`);
        const data = await response.json();

        setVendorData(data[0]); // Assuming the API returns an array
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorDetails();
  }, [vendorId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (!vendorData) {
    return (
      <View style={styles.centered}>
        <Text>No vendor data available</Text>
      </View>
    );
  }

  // Extract the logo and pictures
  const logoUrl = vendorData.logo
    ? { uri: `https://mechbuddy.pythonanywhere.com${vendorData.logo}` }
    : require('../assets/icons/logo.png'); // Fallback logo image

  const renderHeaderImage = () => {
    if (vendorData.picture && vendorData.picture.length > 1) {
      return (
        <FlatList
          data={vendorData.picture}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: `https://mechbuddy.pythonanywhere.com${item.picture}` }}
              style={styles.headerImage}
            />
          )}
        />
      );
    }

    const singleImageUrl =
      vendorData.picture && vendorData.picture.length > 0
        ? { uri: `https://mechbuddy.pythonanywhere.com${vendorData.picture[0].picture}` }
        : require('../assets/images/Back.png'); // Fallback image

    return <Image source={singleImageUrl} style={styles.headerImage} />;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {/* Header with Profile Image */}
      <View style={styles.header}>
        {renderHeaderImage()}
        <View style={styles.profileImageContainer}>
          <Image source={logoUrl} style={styles.profileImage} />
        </View>

        <View style={{ marginLeft: -220, marginTop: 24 }}>
          <AirbnbRating
            count={5}
            defaultRating={4}
            size={20}
            showRating={false}
            isDisabled
            selectedColor="black"
          />
        </View>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/271/271220.png' }}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Vendor Information */}
      <View style={styles.profileDetails}>
        <Text style={styles.vendorName}>{vendorData.name}</Text>
        <Text style={styles.vendorDescription}>
          Our efficient processes and quick turnaround ensure your vehicle is back on the road fast.
        </Text>
      </View>

      {/* Vendor Specifications */}
      <View style={styles.specificationsContainer}>
        <Text style={styles.specificationText}>
          <Text style={styles.specificationLabel}>Working Hours: </Text>9:00 AM - 8:00 PM
        </Text>
        <Text style={styles.specificationText}>
          <Text style={styles.specificationLabel}>Location: </Text>Adhartal, Jabalpur
        </Text>
        <Text style={styles.specificationText}>
          <Text style={styles.specificationLabel}>Contact number: </Text>+91 9876543210
        </Text>
      </View>

      {/* Subscription Section */}
      <Subscription />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: { flexGrow: 1, backgroundColor: '#F9F9F9' },
  header: { height: 250, position: 'relative' },
  headerImage: { width: 400, height: '100%', marginRight: 10, borderRadius: 10 },
  profileImageContainer: {
    position: 'absolute',
    bottom: -30, // Adjust the position to give more space if necessary
    left: '50%',
    transform: [{ translateX: -170 }], // Adjust the position if necessary
    width: 100, // Increased width
    height: 100, // Increased height
    borderRadius: 60, // Keep it circular
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#FFF',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  backButton: { position: 'absolute', top: 10, left: 10 },
  backIcon: { width: 24, height: 24 },
  profileDetails: { alignItems: 'center', marginTop: 20, paddingHorizontal: 20 },
  vendorName: { fontSize: 23, fontWeight: 'bold', marginBottom: 5, marginTop: 50 },
  vendorDescription: { textAlign: 'center', fontSize: 14, color: '#666' },
  specificationsContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
  },
  specificationText: { fontSize: 14, color: '#333', marginBottom: 5 },
  specificationLabel: { fontWeight: 'bold', color: '#555' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default VendorDetails;
