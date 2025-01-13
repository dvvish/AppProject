import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { RootStackParamList } from './types';
import ComingSoon from './components/comingsoon';
 
 
import { icons, images } from './constants';
import Carousel from './components/Carousel';
import VendorList from './components/VendorList';
import SliderReel from './components/Slider';
import Servicing from './components/servicing';
import Parts from './components/parts';
import PartDetails from './components/part details';
import AvailableVendors from './components/Available Vendors';
import VendorDetails from './components/VendorDetails';
import messaging from '@react-native-firebase/messaging';
import ProfileP from './components/ProfilePage';
import IntroScreen from './components/IntroScreen';
import ProfilePage from './components/ProfilePage';
import Cart from './components/cart';
import RegisterUser from './Api/RegisterUser';
import LoginUser from './Api/LoginUser';
import Service from './components/service';
import Modifications from './components/Modifications';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import VendorDetails1 from './components/VendorDetails1';
import InputPage from './components/InputPage';
import DisplayData from './components/Displaydata';
import Data from './components/Data';
import Payment from './components/payment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Registercomp from './components/Registercomp';
import ImageComponent from './components/ImageComponent';
import Pay from './components/Pay';
import { useHandler } from 'react-native-reanimated';
import ContactPage from './components/ContactPage';
import Account from './components/Account';
import Profile from './components/Profile';
import Subscription from './components/Subscription';
import LocationPermissionPage from './components/LocationPermissionPage';
import NotificationPage from './components/NotificationPage';
import Servicedescription from './components/Servicedescription';
 

 


const Stack = createNativeStackNavigator();

 

// for getting integration of firebase config//

function App(): React.JSX.Element {
  const [isUserDataPresent, setIsUserDataPresent] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [dataList, setDataList] = useState<any[]>([]);
  const [policyLink, setPolicyLink] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
 
  
  const  fetchData1 = async () => {
    try {
      const data = await AsyncStorage.getItem('vehicleData');
      console.log('Raw Data from AsyncStorage:', data);
  
      if (data) {
        const parsedData = JSON.parse(data);
        console.log('Parsed Data:', parsedData);
  
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          // Get the most recent vehicle (assuming the last item in the array is the most recent one)
          const mostRecentVehicle = parsedData[parsedData.length - 1];
          
          // Set the category of the most recent vehicle
          setCategory(mostRecentVehicle.category);
  
          console.log('Most Recent Vehicle Category:', mostRecentVehicle.category);
  
          // Optionally, you can remove the previous data from AsyncStorage if needed:
          // You can save the most recent data to AsyncStorage again if you want to keep it updated
          // await AsyncStorage.setItem('vehicleData', JSON.stringify([mostRecentVehicle]));
          
          // If you only want to update AsyncStorage with the latest category:
          await AsyncStorage.setItem('vehicleCategory', mostRecentVehicle.category);
          
          console.log('Saved Latest Category to AsyncStorage:', mostRecentVehicle.category);
        } else {
          console.log('No vehicles found in the data.');
          setCategory(null);  // No category found
        }
      } else {
        console.log('No vehicle data found in AsyncStorage.');
        setCategory(null);  // No category found
      }
    } catch (error) {
      console.error('Error fetching or processing data from AsyncStorage:', error);
    }
  };
  
  useEffect(() => {
     fetchData1();
  }, []);
  
  
  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        const token = await messaging().getToken();
        if (token) {
          await AsyncStorage.setItem('FCMToken', token);
        }
      }
    } catch (error) {
      console.error('Error requesting push notification permissions:', error);
    }
  };

  const fetchPolicyLink = async () => {
    try {
      const response = await fetch('https://mechbuddy.pythonanywhere.com/api/home');
      const result = await response.json();
      if (result.others?.policy) {
        setPolicyLink(result.others.policy);
      }
    } catch (error) {
      console.error('Error fetching policy link:', error);
    }
  };

  useEffect(() => {
    fetchData1();
    requestUserPermission();
    fetchPolicyLink();
  }, []);

  
  
  const handleProfileClick = async (navigation: any) => {
    try {
      const profile = await AsyncStorage.getItem('Token');
      if (profile) {
        navigation.navigate('ProfilePage');
      } else {
        navigation.navigate('LoginUser');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleImageClick = async (navigation: any) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        navigation.navigate('pay');
      } else {
        navigation.navigate('Register');
      }
    } catch (error) {
      console.error('Error checking token:', error);
      navigation.navigate('Register');
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {({ navigation }) => (
            <SafeAreaView style={styles.container}>
              <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
              <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: -40 }}>
                  <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      source={require('./assets/icons/logo.png')}
                      style={{ width: 60, height: 60, resizeMode: 'contain' }}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Data')}
                    style={{ position: 'absolute', right: 65, zIndex: 100, padding: 10 }}
                  >
                    {category === 'two' ? (
                      <Image source={require('./assets/icons/dc/bike.png')} style={styles.icon} />
                    ) : category === 'four' ? (
                      <Image source={require('./assets/icons/car.png')} style={styles.icon} />
                    ) : (
                      <Image source={require('./assets/icons/add.png')} style={styles.icon} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleProfileClick(navigation)}
                    style={{ position: 'absolute', right: 10, zIndex: 100, padding: 10 }}
                  >
                    <Image
                      source={require('./assets/icons/profile.png')}
                      style={{ top: 11, width: 30, height: 30, tintColor: '#ff3131' }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 20 }}>
                  <Carousel />
                </View>
                <View>
                  <TouchableOpacity onPress={() => handleImageClick(navigation)}>
                    <ImageComponent />
                  </TouchableOpacity>
                </View>
                <View style={styles.container}>
                  {policyLink && (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => Linking.openURL(policyLink)}
                    >
                      <Text style={styles.buttonText}>Click here to view the rules</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View>
                  <Service />
                </View>
                <View>
                  <Modifications />
                </View>
                <View>
                  <Subscription />
                </View>
                <SliderReel />
              </ScrollView>
            </SafeAreaView>
          )}
        </Stack.Screen>
        <Stack.Screen name="ComingSoon" component={ComingSoon} />
        {/* <Stack.Screen name="VendorDetail" component={VendorDetail} />
        <Stack.Screen name='VendorDetails' component={VendorDetails}/> */}
        
        <Stack.Screen name='Servicedescription' component={Servicedescription}></Stack.Screen>
        <Stack.Screen name='VendorList' component={VendorList} />
        <Stack.Screen name='Services' component={Servicing} options={{ headerShown: true }} />
        <Stack.Screen name='Parts' component={Parts} options={{ headerShown: true }} />
        <Stack.Screen name='PartDetails' component={PartDetails} />
        <Stack.Screen name='AvailableVendors' component={AvailableVendors} />
        <Stack.Screen name='VendorDetails' component={VendorDetails} options={{headerShown:false}} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="App" component={App} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} options={{headerShown:false}}/>
        {/* <Stack.Screen name="InputData"  component={DisplayData} /> */}
   {/* <Stack.Screen name="Register" component={Registercomp} options={{headerShown:false}}/> */}
        <Stack.Screen name="LoginUser" component={LoginUser} />
          <Stack.Screen name="VehicleForm" component={InputPage}/> 
        <Stack.Screen name="VendorDetails1" component={VendorDetails1} />
          <Stack.Screen name = "Data" component={Data} options={{headerShown:false}}/>
    <Stack.Screen name= "payment" component={Payment} options={{headerShown:false}}/>
        <Stack.Screen name="pay" component={Pay} />
        <Stack.Screen name="Register" component={Registercomp} options={{ headerShown: false }} />
        {/* Add other screens here */}
        <Stack.Screen name ="Contact" component={ContactPage}/>
        <Stack.Screen name ="Notification" component={NotificationPage}/>
        <Stack.Screen name ="Profile" component={ Profile} options={{headerShown :false}}/>
        <Stack.Screen name ="Location" component={ LocationPermissionPage} options={{headerShown :false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  button: { backgroundColor:  '#ff3131', padding: 10, borderRadius: 5 },
  buttonText: { color: 'black', fontWeight: 'bold' ,alignItems:'center',textAlign:'center',fontSize:15 },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginBottom:-5,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginTop:10,
    width: 30,
    height: 30,
    marginLeft: 140,
    tintColor: '#FF3131',
  },
  servicesSection: {
    padding: 10,
  },
  sectionTitle: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 10,
  },
  serviceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceButton: {
    width: '48%',
    padding: 20,
    backgroundColor: '#f0f0f0', // Light background for buttons
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  userListSection: {
    padding: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular DP
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDescription: {
    fontSize: 14,
    color: '#555',
  },
  storeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 15,
    borderRadius: 50,
    backgroundColor: '#ffffff', // White background for the button
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeIcon: {
    width: 60,
    height: 60,
  },
  divider: {
    width: '100%',
    height: 16, // Thickness of the line
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
    marginBottom:2,
      // Space around the line
  },
});

export default App;

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}
