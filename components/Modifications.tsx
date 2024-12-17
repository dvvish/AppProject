import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, } from 'react-native';

// Import static images
import { icons } from '../constants';
import navigation from './Naviagtion';
import { useNavigation } from '@react-navigation/native';

interface Modification {
    id: string;
    name: string;
    description: string;
    icon: any; // Local image
}

// Static data array for modifications
const staticModificationData: Modification[] = [
    {
        id: '1',
        name: 'Customization',
        description: 'Upgrade your car, unforgettable ride.',
        icon: icons.s10,
    },
    {
        id: '2',
        name: 'Transformation',
        description: 'Vision meets expert craftsmanship here.',
        icon: icons.s11,
    },
    {
        id: '3',
        name: 'Restoration',
        description: 'Rewind time for flawless finish.',
        icon: icons.s12,
    },
    {
        id: '4',
        name: 'Wrapping',
        description: 'Transform with precision, perfect wrap.',
       icon: icons.s13,
    },
];

const Modifications = () => {
    const navigation =useNavigation();
    const handlePress = (modification: Modification) => {
         navigation.navigate('VendorList');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Modifications</Text>
            <ScrollView contentContainerStyle={styles.gridContainer}>
                {staticModificationData.map((modification) => (
                    <TouchableOpacity
                        key={modification.id}
                        style={styles.card}
                        onPress={() => handlePress(modification)}
                        activeOpacity={0.8}
                    >
                        <Image source={modification.icon} style={styles.icon} />
                        <Text style={styles.name}>{modification.name}</Text>
                        <Text style={styles.description}>{modification.description}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
       padding:20,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
        padding:20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Wrap items to the next row
        justifyContent: 'space-between', // Add spacing between cards
    },
    card: {
        width: '46%', // Adjust width to fit 2 cards per row with spacing
        marginBottom: 20, // Spacing between rows
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 6,
        alignItems: 'center',
        borderWidth: 2, // Uniform border width
    borderColor: '#fcfcfc', // Glowing border color (light blue)
    shadowColor: '#4A90E2', // Glow effect color
    // Even shadow on all sides
    shadowRadius: 10, // Glow intensity
    shadowOpacity: 0.5,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        paddingBottom: 5,
    },
    description: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});

export default Modifications;
