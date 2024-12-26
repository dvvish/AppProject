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
import messaging from '@react-native-firebase/messaging';
 
import { icons, images } from './constants';
import Carousel from './components/Carousel';
import VendorList from './components/VendorList';
import SliderReel from './components/Slider';
import Servicing from './components/servicing';
import Parts from './components/parts';
import PartDetails from './components/part details';
import AvailableVendors from './components/Available Vendors';
import VendorDetails from './components/VendorDetails';
 
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
 

 


const Stack = createNativeStackNavigator();

 

// for getting integration of firebase config//

function App(): React.JSX.Element {
  const [isUserDataPresent, setIsUserDataPresent] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
   const [dataList, setDataList] = useState([]);
const [policyLink, setPolicyLink] = useState<string | null>(null);
const [profile, setProfile] = useState<string>('');
const [category, setCategory] = useState(null);
  // Fetch user data and payment status
  const fetchData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        console.log('User Data:', userData);
       // setIsUserDataPresent(true);
        console.log(isUserDataPresent);
      }
    }
      catch{
        console.log('no data');
      }
    };
    const payment = async () => {
      try {
        // Fetch payment status from API
        const response = await fetch('https://mechbuddy.pythonanywhere.com/api/home');
        const result = await response.json();
    
        if (result.others && typeof result.others.payment !== 'undefined') {
          setPaymentStatus(result.others.payment);
          console.log(paymentStatus); // Update payment status with the value of "payment"
        } else {
          console.warn('No payment status found in the API.');
        }
      } catch (error) {
        console.error('Error fetching payment status:', error);
      } finally {
        setLoading(false); // Stop the loading indicator
      }
    };
    useEffect(() => {
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
    
        fetchPolicyLink();
      }, []);

    const register = async () => {
      try {
        // Fetch payment status from API
        const response = await fetch('https://mechbuddy.pythonanywhere.com/api/home');
        const result = await response.json();
    
        if (result.others && typeof result.others.register !== 'undefined') {
          setIsUserDataPresent(result.others.register);
          console.log(isUserDataPresent); // Update payment status with the value of "payment"
        } else {
          console.warn('No payment status found in the API.');
        }
      } catch (error) {
        console.error('Error fetching payment status:', error);
      } finally {
        setLoading(false); // Stop the loading indicator
      }
    };
    const fetchuser = async () => {
 try{
const profile= await AsyncStorage.getItem('Token');
console.log(profile);
 }
 catch(error){
console.log('error');
 }

    }
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Permission',
            message: 'This app needs access to your location to function properly.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
  
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         // Alert.alert('Permission Granted', 'You can access location services.');
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          Alert.alert('Permission Denied', 'Location permission was denied.');
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Permission Blocked',
            'You chose "Never Ask Again." Enable permissions manually in settings.'
          );
        }
      } else {
        Alert.alert(
          'iOS Permission',
          'iOS will automatically handle location permissions when needed.'
        );
      }
    };
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
      requestPermission();
      fetchData1();
      //for fetch user login or not// 
      fetchuser();
    }, []);

    
  const handlePaymentButton = async (navigation: any) => {
    try {
      const isPaid = await AsyncStorage.getItem('ispaid');
      if (isPaid === 'true') {
        Alert.alert('Payment Status', 'Payment already completed.');
      } else {
        navigation.navigate('pay');
      }
    } catch (error) {
      console.error('Error fetching payment status:', error);
    }
  };

  const handleImageClick = async (navigation: any) => {
    try {
      const token = await AsyncStorage.getItem('authToken'); 
      // Replace 'authToken' with your actual key
      if (token) {
        console.log('Token:', token);
        // fetchData();
        navigation.navigate('pay');
      } else {
        navigation.navigate('Register');
      }
    } catch (error) {
      console.error('Error checking token:', error);
      navigation.navigate('Register');
    }
  };
  const handleProfileClick = async (navigation: any) => {
   const profile= await AsyncStorage.getItem('Token');
   if(profile){
    console.log('Token:', profile);
    navigation.navigate('ProfilePage');
   }
   else{
    console.log('error');
    navigation.navigate('LoginUser');
   }



  };

  useEffect(() => {
    // fetchData();
    payment();
    register();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {({ navigation }) => (
            <SafeAreaView style={styles.container}>
              <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
              <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                {/* Top Section */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: -40 }}>
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                     
                    <Image
                      source={require('./assets/icons/logo.png')}
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
{/* To navigate into data of vehicle*/}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Data')}
                    style={{
                      position: 'absolute',
                      right: 65,
                      zIndex: 100,
                      padding: 10,
                    }}
                  >
                    {/* <Image
                      source={require('./assets/icons/wheel.png')}
                      style={{
                        top: 11,
                        width: 30,
                        height: 30,
                        //tintColor: '#ff3131',
                      }}
                    />
                    <Image
                      source={ {uri:'https://cdn-icons-png.flaticon.com/512/32/32563.png'}}
                      style={{
                        top: -25,
                        width: 13,
                        marginLeft:22,
                        height: 13,
                        //tintColor: '#ff3131',
                      }}
                    /> */}
                    {/* We are taking data of the inputpage data  we have to save the and display the data page saved data*/}
                  
                  {category === "two" ? (
          <Image
          source={require('./assets/icons/dc/bike.png')}
            style={styles.icon}
          />
        ) : category === "four" ? (
          <Image
            source={
             require('./assets/icons/car.png') // Four-wheeler icon
            }
            style={styles.icon}
          />
        ) : (
          <Image source={require('./assets/icons/add.png')} style={styles.icon} />
        )}
         </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleProfileClick(navigation)}
                    style={{
                      position: 'absolute',
                      right: 10,
                      zIndex: 100,
                      padding: 10,
                    }}
                  >
                    <Image
                      source={require('./assets/icons/profile.png')}
                      style={{
                        top: 11,
                        width: 30,
                        height: 30,
                        tintColor: '#ff3131',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 20 }}>
                  <Carousel />
                </View>

                {/* ImageComponent Section */}
                <View>
                  <TouchableOpacity onPress={() => handleImageClick(navigation)}>
                    <ImageComponent />
                  </TouchableOpacity>
                </View>
                
                
{/* this is the button */}
<View style={styles.container}>
  {/* if both are true than does not show the button  */}
                  {/* Button appears if user data is present and payment is false */}
                   
                   {/* For */}
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => policyLink && Linking.openURL(policyLink)}
                    >
                      <Text style={styles.buttonText}>Click here to view the rules </Text>
                    </TouchableOpacity>
                
                </View>
                  
                 
<View style={styles.divider}>
  {/* <View>
    <Image style={{height:20,width:20}} source={require('./assets/icons/car.png')}></Image>
  </View> */}

</View>
                {/* Buttons Section */}
                <View>
                  <Service />
                </View>

                <View style={styles.divider}>

</View>
{/* <View>
  if(!Profile){
<Image source={require('../Mechb/assets/icons/car.png')}></Image>
  }
</View> */}
{/* Modifications */}
                <View>
                  <Modifications />
                </View>
                 
                <View style={styles.divider}></View>
                 
{/* Subscriptions */}
                <View>
                <Subscription/>

                </View>
                <View style={styles.divider}></View>
                <SliderReel/>
                <View style={styles.iconContainer}>
        
      </View>
                 
                <View style={styles.divider}></View>
              </ScrollView>
            </SafeAreaView>
          )}
        </Stack.Screen>
        <Stack.Screen name="ComingSoon" component={ComingSoon} />
        {/* <Stack.Screen name="VendorDetail" component={VendorDetail} />
        <Stack.Screen name='VendorDetails' component={VendorDetails}/> */}
        <Stack.Screen name='VendorList' component={VendorList} />
        <Stack.Screen name='Servicing' component={Servicing} options={{ headerShown: true }} />
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
          <Stack.Screen name="InputPage" component={InputPage}/> 
        <Stack.Screen name="VendorDetails1" component={VendorDetails1} />
          <Stack.Screen name = "Data" component={Data}/>
    <Stack.Screen name= "payment" component={Payment} options={{headerShown:false}}/>
        <Stack.Screen name="pay" component={Pay} />
        <Stack.Screen name="Register" component={Registercomp} options={{ headerShown: false }} />
        {/* Add other screens here */}
        <Stack.Screen name ="Contact" component={ContactPage}/>
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
