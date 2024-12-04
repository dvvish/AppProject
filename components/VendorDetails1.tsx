import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const  VendorDetails1 = () => {
  const user = {
    name: 'Duqyaha Panova',
    profession: 'User profession here',
    address: 'Sharda colony, new kanchanpur, jabalpur',
    stats: {
      bookings: 568,
      pointsEarned: 2045,
      favoriteServices: 150,
    },
    about:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with DP */}
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={{ uri: 'https://via.placeholder.com/400x200' }} // Replace with your main image URL
        />
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your DP image URL
          />
        </View>
      </View>

      {/* Profile Info Section */}
      <View style={styles.profileSection}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.profession}>{user.profession}</Text>
        <Text style={styles.address}>{user.address}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(4)].map((_, index) => (
            <Image
              key={index}
              style={styles.starIcon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828884.png',
              }}
            />
          ))}
          <Image
            style={styles.starIcon}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828970.png',
            }}
          />
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        {Object.entries(user.stats).map(([key, value]) => (
          <View key={key} style={styles.statCard}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{key}</Text>
          </View>
        ))}
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>{user.about}</Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  header: {
    height: 200,
    position: 'relative', // Ensure the profile image is positioned relative to the header
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: -40, // Positioning the DP at the bottom-center of the header
    left: '50%',
    transform: [{ translateX: -40 }], // Centering the DP horizontally
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#fff', // Adding a white border for separation
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  profession: { fontSize: 14, color: '#666', marginVertical: 5 },
  address: { fontSize: 12, color: '#888' },
  ratingContainer: { flexDirection: 'row', marginTop: 5 },
  starIcon: { width: 20, height: 20, marginRight: 5 },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFF',
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 3,
  },
  statCard: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#666' },
  aboutSection: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 3,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  aboutText: { fontSize: 14, color: '#666' },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});

export default  VendorDetails1;
