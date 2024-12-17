import React from 'react';
import { StyleSheet, View, Text, Linking, TouchableOpacity } from 'react-native';

const ContactPage = () => {
  const phoneNumber = ' +91 84357 76053';
  const email = ' support@mechbuddy.in';

  const handlePhonePress = () => {
    Linking.openURL(`tel:${phoneNumber}`).catch((err) => console.error('Error opening dialer:', err));
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`).catch((err) => console.error('Error opening email:', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>

      <TouchableOpacity onPress={handlePhonePress} style={styles.contactItem}>
        <Text style={styles.contactText}>📞 {phoneNumber}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleEmailPress} style={styles.contactItem}>
        <Text style={styles.contactText}>✉️ {email}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  contactItem: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#ff3131',
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default ContactPage;
