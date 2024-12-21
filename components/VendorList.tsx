import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { icons } from '../constants';
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';

const VendorList: React.FC<VendorListProps> = ({ navigation }) => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('https://mechbuddy.pythonanywhere.com/api/vendor-list');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const handlePress = (id: string): void => {
    navigation.navigate('VendorDetails', { vendorId: id });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loaderText}>Loading vendors...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={vendors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const imageUrl = item.logo
            ? { uri: `https://mechbuddy.pythonanywhere.com${item.logo}` }
            : icons.logo;

          return (
            <TouchableOpacity style={styles.vendorItem} onPress={() => handlePress(item.id)}>
              {/* Badge for Each List Item */}
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>Top Vendor</Text>
              </View>

              <Image source={imageUrl} style={styles.vendorImage} />
              <View style={styles.vendorInfo}>
                <Text style={styles.vendorName}>{item.name}</Text>
                <Text style={styles.vendorDescription}>
                  {item.aboutus || 'No description available.'}
                </Text>
                {/* 5-Star Rating */}
                <View style={styles.ratingContainer}>
                  {[...Array(5)].map((_, index) => (
                    <Image
                      key={index}
                      source={require('../assets/icons/star.png')}
                      style={styles.starIcon}
                    />
                  ))}
                </View>
                <View style={styles.iconRow}>
                  <TouchableOpacity>
                    <Image source={require('../assets/icons/point.png')} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require('../assets/icons/phone.png')} style={styles.icon1} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  listContent: {
    paddingVertical: 20,
  },
  vendorItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 13,
    elevation: 5,
    shadowColor: '#000',
    margin: 4,
    position: 'relative', // To position the badge properly
  },
  badgeContainer: {
    position: 'absolute',
    top: -10,
    left: -10,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  vendorImage: {
    width: 80,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: '#f0f0f0',
  },
  vendorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  vendorName: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  vendorDescription: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: -27,
  },
  starIcon: {
    width: 15,
    height: 15,
    marginHorizontal: 2,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  icon1: {
    width: 18,
    height: 18,
    marginLeft: 13,
  },
  icon: {
    width: 18,
    height: 18,
    marginLeft: 160,
  },
});

export default VendorList;
