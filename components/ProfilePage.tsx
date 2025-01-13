import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import App from '../App';
import IntroScreen from './IntroScreen';
import Servicing from './servicing';
import VendorList from './VendorList';
import Cart from './cart';
import ComingSoon from './comingsoon';
import LoginUser from '../Api/LoginUser';
import RegisterUser from '../Api/RegisterUser';
import Data from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { router } from 'expo-router';
// import { signOut } from 'firebase/auth';
// import { auth } from '@/app/(auth)/firebaseConfig'; // Your Firebase configuration file

 

const ProfilePage = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [category, setCategory] = useState(null);

    const fetchData1 = async () => {
        try {
          const data = await AsyncStorage.getItem('vehicleData');
          if (data) {
             console.log('Data:', data);
              
            const parsedData = JSON.parse(data);
            const categories = parsedData.map((item: any) => item.category);
            if (categories.includes("four")) {
              setCategory("four");
              console.log('Category "four" exists in the data.');
            } else if (categories.includes("two")) {
              setCategory("two");
              console.log('Category "two" exists in the data.');
            } else {
              setCategory(null);
              console.log("No relevant category exists in the data.");
            }
          }
          
        } catch (error) {
          console.error('Error retrieving data', error);
        }
      };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await AsyncStorage.getItem('userData'); // Replace 'userData' with your key
                if (data) {
                    setUserData(JSON.parse(data)); // Parse JSON data if stored as a string
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
        fetchData1();
    }, []);
    const fetchuser = async () => {
                 navigation.navigate("Profile"); // Parse JSON data if stored as a string
    };

    const handleHomePress = () => {
        navigation.goBack();
    };

    const handleIntroScreenPress = () => {
        navigation.navigate('Data'); // Ensure 'Data' is correctly defined in your navigation stack
    };

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Gear Icon for Intro Screen */}
                <TouchableOpacity
                    onPress={handleIntroScreenPress}
                    style={{
                        position: 'absolute',
                        top: Platform.OS === 'ios' ? 10 : 25,
                        left: 20,
                        zIndex: 10,
                        padding: 5,
                    }}
                >
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3374/3374550.png' }} // Replace with your gear icon URI
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                </TouchableOpacity>

                {/* Home Button */}
                <TouchableOpacity
                    onPress={handleHomePress}
                    style={{
                        position: 'absolute',
                        top: Platform.OS === 'ios' ? 10 : 25,
                        right: 20,
                        zIndex: 10,
                        padding: 5,
                    }}
                >
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10307/10307931.png' }} // Replace with your home icon URI
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/17878/17878705.png' }}
                    />
                    <Text style={styles.name}>Profile</Text>
                </View>

                <View style={styles.body}>
                    {/* Updated My Profile Section */}
                    <TouchableOpacity
                        style={styles.section}
                        onPress={ 
                           fetchuser
                        }
                    >
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png' }}
                            style={styles.iconImage}
                        />
                        <View>
                            {userData ? (
                                <>
                                    <Text style={styles.sectionTitle}>Welcome, {userData.username}</Text>
                                    <Text style={styles.sectionDescription}>View and edit your profile details</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.sectionTitle}>My Profile</Text>
                                    <Text style={styles.sectionDescription}>Log in to access your profile</Text>
                                </>
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* Services Section */}
                    <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Services')}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/11515/11515286.png' }}
                            style={styles.iconImage}
                        />
                        <View>
                            <Text style={styles.sectionTitle}>Services</Text>
                            <Text style={styles.sectionDescription}>Explore the services we offer</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Vendors Section */}
                    <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('VendorList')}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10951/10951894.png' }}
                            style={styles.iconImage}
                        />
                        <View>
                            <Text style={styles.sectionTitle}>Vendors</Text>
                            <Text style={styles.sectionDescription}>Find available vendors near you</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Cart Section */}
                    <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Cart')}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/14985/14985858.png' }}
                            style={styles.iconImage}
                        />
                        <View>
                            <Text style={styles.sectionTitle}>Cart</Text>
                            <Text style={styles.sectionDescription}>View items in your cart</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Notifications Section */}
                    <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Notification')}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3541/3541850.png' }}
                            style={styles.iconImage}
                        />
                        <View>
                            <Text style={styles.sectionTitle}>Notifications</Text>
                            <Text style={styles.sectionDescription}>View your notifications</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Contact Section */}
                    <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Contact')}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/724/724664.png' }}
                            style={styles.iconImage}
                        />
                        <View>
                            <Text style={styles.sectionTitle}>Contact</Text>
                            <Text style={styles.sectionDescription}>Get in touch with us</Text>
                        </View>
                    </TouchableOpacity>

                    {/*  */}
                    <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Data')}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3418/3418139.png' }}
                            style={styles.iconImage}
                        />
                        <View>
                            <Text style={styles.sectionTitle}>Vehicle Data </Text>
                            <Text style={styles.sectionDescription}>View your selected vehicle </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

 

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 60,
        marginBottom: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
    },
    body: {
        flex: 1,
        width: '100%',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#000',
        marginLeft: 10,
    },
    sectionDescription: {
        fontSize: 12,
        color: '#999',
        marginLeft: 10,
        marginTop: 5,
    },
    iconImage: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
});

export default ProfilePage;