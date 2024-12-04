import { createStackNavigator } from '@react-navigation/stack';
import ComingSoon from './comingsoon';
//import VendorDetail from './VendorDetail';

const Stack = createStackNavigator();

function navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ComingSoon" component={ComingSoon} />
   

       
    </Stack.Navigator>
  );
}
export default navigation;