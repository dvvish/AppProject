import { Image, ScrollView, Text, View, TouchableOpacity, Platform ,StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import navigation from "./Naviagtion";
 
 
 

const Profile = ({ navigation }) => {
  const [isBikeOn, setIsBikeOn] = useState(true);
  const [isOnline, setIsOnline] = useState(false); // For availability status
  const [vehicleImageUrl, setVehicleImageUrl] = useState(
    'https://cdn-icons-png.flaticon.com/128/9983/9983173.png'
  );
  const [user, setUser] = useState({
    name: '',
    mobile: '',
    email: '',
    vehicleType: 'Bike',
    vehicleModel: '',
    location: '',
    profileImage: '',
    plan: 'Premium',
  });

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        // Retrieve saved profile data from AsyncStorage
        const storedProfile = await AsyncStorage.getItem('Profile');
        if (storedProfile) {
          const userDetails = JSON.parse(storedProfile);
          setUser(userDetails);

          // Determine the vehicle type to update the image
          const isBike = userDetails.vehicleType?.toLowerCase() === 'bike';
          setIsBikeOn(isBike);
          setVehicleImageUrl(
            isBike
              ? 'https://cdn-icons-png.flaticon.com/128/9983/9983173.png'
              : 'https://cdn-icons-png.flaticon.com/128/3085/3085330.png'
          );
        }
      } catch (error) {
        console.error('Failed to load user details:', error);
      }
    };

    loadUserDetails();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={handleBackPress}
          style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 10 : 30,
            left: 10,
            zIndex: 10,
            padding: 5,
          }}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/271/271220.png' }}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>

        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: '500', textAlign: 'center', flex: 1 }}>
            Profile Information
          </Text>
          <Image source={{ uri: vehicleImageUrl }} style={{ width: 50, height: 50 }} />
        </View>

        {/* Profile Information Card */}
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 15,
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 5,
          }}
        >
          <View style={styles.infoRow}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9068/9068842.png' }}
              style={styles.icon}
            />
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user.username || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/6806/6806987.png' }}
              style={styles.icon}
            />
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/724/724664.png' }}
              style={styles.icon}
            />
            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>{user.mobile || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3665/3665989.png' }}
              style={styles.icon}
            />
            <Text style={styles.label}>Vehicle Type:</Text>
            <Text style={styles.value}>{user.vehicleType || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3665/3665975.png' }}
              style={styles.icon}
            />
            <Text style={styles.label}>Vehicle Model:</Text>
            <Text style={styles.value}>{user.vehicleModel || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9572/9572671.png' }}
              style={styles.icon}
            />
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{user.location || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/4334/4334291.png' }}
              style={styles.icon}
            />
            <Text style={styles.label}>Plan:</Text>
            <Text style={styles.value}>{user.plan || 'N/A'}</Text>
          </View>
          <View style ={styles.infoRow}>
            
            </View>

          <View style={styles.infoRow}>
            <Image
              source={{
                uri: isOnline
                  ? 'https://cdn-icons-png.flaticon.com/128/190/190411.png'
                  : 'https://cdn-icons-png.flaticon.com/128/1828/1828843.png',
              }}
              style={styles.icon}
            />
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.value, { marginRight: 8 }]}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles =StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
    flex: 1,
    paddingRight:15,
  },
  value: {
    fontSize: 12,
    color: '#333',
    flex: 2,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default Profile;
