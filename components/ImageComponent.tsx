import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
 

const ImageComponent: React.FC = () => {
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
