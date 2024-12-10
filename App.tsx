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
} from 'react-native';
import { RootStackParamList } from './types';
import ComingSoon from './components/comingsoon';
import messaging from '@react-native-firebase/messaging';
// import VendorDetail from './components/VendorDetail'; // Import VendorDetail
// import VendorDetails from './components/VendorDetails';
//import Carousel from 'react-native-snap-carousel';
import { icons } from './constants';
import Carousel from './components/Carousel';
import VendorList from './components/VendorList';
import SliderReel from './components/Slider';
import Servicing from './components/servicing';
import Parts from './components/parts';
import PartDetails from './components/part details';
import AvailableVendors from './components/Available Vendors';
import VendorDetails from './components/VendorDetails';
//import ProfilePage from './components/ProfilePage';
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
//import { icons } from './constants';

 


const Stack = createNativeStackNavigator();

// Sample data for FlatList
// const userData = [
//   {
//     id: '1',
//     name: ' Jashwant Singh',
//     description: 'Best service provider for bikes',
//     dp: 'https://www.mechbuddy.in/img/about/about.jpg',
//   },
//   {
//     id: '2',
//     name: ' Shivam ',
//     description: 'Modification Expert',
//     dp: 'https://www.mechbuddy.in/img/about/about.jpg',
//   },
//   // Add more users as needed
// ];


// for getting integration of firebase config//

function App(): React.JSX.Element {
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  // Fetch saved data from AsyncStorage
  useEffect(() => {
    const checkData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        setIsDataSubmitted(!!userData); // Set true if userData exists
      } catch (err) {
        console.error('Error fetching data from AsyncStorage:', err);
      }
    };

    checkData();
  }, []);

  // Permissions and token fetching logic
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.log('FAIL');
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('Token = ', token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
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
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 0 }}>
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
                        width: 50,
                        height: 50,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('InputPage')}
                    style={{
                      position: 'absolute',
                      right: 65,
                      zIndex: 100,
                      padding: 10,
                    }}
                  >
                    <Image
                      source={require('./assets/icons/wheel.png')}
                      style={{
                        top: 10,
                        width: 40,
                        height: 40,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('ProfilePage')}
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
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <ImageComponent />
                  </TouchableOpacity>
                </View>

                {/* Conditional Section */}
                {isDataSubmitted && (
                  <View style={{ padding: 10 , backgroundColor:'#fffff',}}>
                    <Button
                      title="Go to Payment and complete your registration"
                      onPress={() => navigation.navigate('pay')}
                    />
                  </View>
                )}

                {/* Buttons Section */}
                <View>
                  <Service />
                </View>

                <View>
                  <Modifications />
                </View>

                <View style={styles.divider}></View>
                <View style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                  {/* Modification Services Heading */}
                  <View></View>
                </View>

                <View>
                  <SliderReel />
                </View>
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
   <Stack.Screen name="Register" component={Registercomp} options={{headerShown:false}}/>
        <Stack.Screen name="LoginUser" component={LoginUser} />
          <Stack.Screen name="InputPage" component={InputPage}/> 
        <Stack.Screen name="VendorDetails1" component={VendorDetails1} />
          <Stack.Screen name = "Data" component={Data}/>
    <Stack.Screen name= "payment" component={Payment} options={{headerShown:false}}/>
        {/* <Stack.Screen name='VendorDetail' component={VendorDetail}/> */}
<Stack.Screen name="pay" component={Pay}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginBottom:10,
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
    width: 40,
    height: 40,
    marginLeft: 15,
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