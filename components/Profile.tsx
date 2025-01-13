import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const Profile = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isBikeOn, setIsBikeOn] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [vehicleImageUrl, setVehicleImageUrl] = useState(
    "https://cdn-icons-png.flaticon.com/128/9983/9983173.png"
  );
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    vehicleType: "Bike",
    vehicleModel: "",
    location: "",
    profileImage: "",
    plan: "Premium",
  });

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const VehicleData = await AsyncStorage.getItem("VehicleData");
        if (VehicleData) {
          console.log("VehicleData", VehicleData);
        }
        const storedProfile = await AsyncStorage.getItem("Profile");
        if (storedProfile) {
          const userDetails = JSON.parse(storedProfile);
          setUser(userDetails);
          const isBike = userDetails.vehicleType?.toLowerCase() === "bike";
          setIsBikeOn(isBike);
          setVehicleImageUrl(
            isBike
              ? "https://cdn-icons-png.flaticon.com/128/9983/9983173.png"
              : "https://cdn-icons-png.flaticon.com/128/3085/3085330.png"
          );
        }
      } catch (error) {
        console.error("Failed to load user details:", error);
      }
    };

    const subscribeToNetworkStatus = () => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsOnline(state.isConnected && state.isInternetReachable);
      });
      return unsubscribe;
    };

    loadUserDetails();

    const unsubscribe = subscribeToNetworkStatus();

    return () => {
      unsubscribe();
    };
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem("Profile", JSON.stringify(user));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save user details:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Back Button */}
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/271/271220.png",
            }}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile Information</Text>
          <Image source={{ uri: vehicleImageUrl }} style={styles.vehicleIcon} />
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          onPress={isEditing ? handleSaveChanges : handleEditToggle}
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>

        {/* Profile Information Card */}
        <View style={styles.profileCard}>
          {[
            {
              label: "Name",
              field: "name",
              icon: "https://cdn-icons-png.flaticon.com/128/9068/9068842.png",
              editable: false,
            },
            {
              label: "Email",
              field: "email",
              icon: "https://cdn-icons-png.flaticon.com/128/6806/6806987.png",
              editable: false,
            },
            {
              label: "Mobile",
              field: "mobile",
              icon: "https://cdn-icons-png.flaticon.com/128/724/724664.png",
              editable: true,
            },
            {
              label: "Vehicles",
              field: "vehicleType",
              icon: "https://cdn-icons-png.flaticon.com/128/3665/3665989.png",
              editable: true,
            },
            // {
            //   label: "Vehicle Model",
            //   field: "vehicleModel",
            //   icon: "https://cdn-icons-png.flaticon.com/128/3665/3665975.png",
            //   editable: true,
            // },
            {
              label: "Address",
              field: "location",
              icon: "https://cdn-icons-png.flaticon.com/128/9572/9572671.png",
              editable: true,
            },
            {
              label: "Your Plan",
              field: "plan",
              icon: "https://cdn-icons-png.flaticon.com/128/4334/4334291.png",
              editable: true,
            },
          ].map(({ label, field, icon, editable }) => (
            <View style={styles.infoRow} key={field}>
              <Image source={{ uri: icon }} style={styles.icon} />
              <Text style={styles.label}>{label}:</Text>
              {isEditing && editable ? (
                <TextInput
                  style={styles.input}
                  value={user[field]}
                  onChangeText={(value) => handleInputChange(field, value)}
                  placeholder={`Enter ${label}`}
                />
              ) : (
                <Text style={styles.value}>{user[field] || "N/A"}</Text>
              )}
            </View>
          ))}

          {/* Status */}
          <View style={styles.infoRow}>
            <Image
              source={{
                uri: isOnline
                  ? "https://cdn-icons-png.flaticon.com/128/190/190411.png"
                  : "https://cdn-icons-png.flaticon.com/128/1828/1828843.png",
              }}
              style={styles.icon}
            />
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{isOnline ? "Online" : "Offline"}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 10 : 30,
    left: 10,
    zIndex: 10,
    padding: 5,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
  },
  vehicleIcon: {
    width: 50,
    height: 50,
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
    flex: 1,
    paddingRight: 15,
  },
  value: {
    fontSize: 12,
    color: "#333",
    flex: 2,
  },
  input: {
    flex: 2,
    fontSize: 12,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default Profile;
