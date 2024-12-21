import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';

const  Account = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    contact: '+1 123-456-7890',
    profileImage: 'https://via.placeholder.com/150', // Replace with actual URL or local image path
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={user.name} editable={false} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={user.email} editable={false} />
        <Text style={styles.label}>Contact</Text>
        <TextInput style={styles.input} value={user.contact} editable={false} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    paddingBottom: 5,
  },
});

export default  Account;
