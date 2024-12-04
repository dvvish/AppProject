// comingsoon.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type ComingSoonProps = {
  navigation: {
    goBack: () => void;
  };
};

const ComingSoon: React.FC<ComingSoonProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming Soon!</Text>
      <Text style={styles.description}>
        We're working hard to bring you this feature. Stay tuned!
      </Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF3131',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ComingSoon;
