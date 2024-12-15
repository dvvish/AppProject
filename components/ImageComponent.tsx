import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
 

const ImageComponent: React.FC = () => {
  // useEffect(() => {
  //   const checkData = async () => {
  //     try {
  //       const userData = await AsyncStorage.getItem('userData');
  //       setIsDataSubmitted(!!userData); // Set true if userData exists
  //     } catch (err) {
  //       console.error('Error fetching data from AsyncStorage:', err);
  //     }
  //   };

  //   checkData();
  // }, []);

  return (
    
    <View style={styles.container}>
        
         
      <Image  
        source={require('../assets/icons/register.png')} 
        style={styles.image} 
        resizeMode="contain" 
      />
     
    </View>
    
     
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 400,
    height: 200,
    marginTop:-40,
  },
});

export default ImageComponent;
function setIsDataSubmitted(arg0: boolean) {
  throw new Error('Function not implemented.');
}

