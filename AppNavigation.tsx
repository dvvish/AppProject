import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Import all components/screens
import ComingSoon from './components/comingsoon';
import VendorList from './components/VendorList';
import Servicing from '../components/servicing';
import Parts from './components/parts';
import PartDetails from './components/part details';
import AvailableVendors from './components/Available Vendors';
import VendorDetails from './components/VendorDetails';
import ProfilePage from './components/ProfilePage';
import IntroScreen from './components/IntroScreen';
import Cart from './components/cart';
import RegisterUser from './Api/RegisterUser';
import LoginUser from './Api/LoginUser';
import home from './home';

// Create a Stack Navigator
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={home} options={{ headerShown: false }} />
        <Stack.Screen name="ComingSoon" component={ComingSoon} />
        <Stack.Screen name="VendorList" component={VendorList} />
        <Stack.Screen name="Servicing" component={Servicing} options={{ headerShown: false }} />
        <Stack.Screen name="Parts" component={Parts} options={{ headerShown: false }} />
        <Stack.Screen name="PartDetails" component={PartDetails} />
        <Stack.Screen name="AvailableVendors" component={AvailableVendors} />
        <Stack.Screen name="VendorDetails" component={VendorDetails} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} />
        <Stack.Screen name="LoginUser" component={LoginUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Dummy Home Screen Component


export default AppNavigation;
