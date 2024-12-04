import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity  } from "react-native";
//
import { useNavigation } from "@react-navigation/native";
import { icons } from "../constants";
import App from "../App";
import { ScrollView } from "react-native-gesture-handler";
 

// const loadFonts = async () => {
//     await Font.loadAsync({
//         'JakartaBold': require('@/assets/fonts/PlusJakartaSans-Bold.ttf'), // Adjust the path as necessary
//         'JakartaLight': require('@/assets/fonts/PlusJakartaSans-Light.ttf'), // Adjust the path as necessary
//     });
// };

  const IntroScreen: React.FC = () => {
    //const router = useRouter();
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [vehicleType, setVehicleType] = useState("Bike"); // Default to Bike
    const [vehicleModel, setVehicleModel] = useState("");
    const [location, setLocation] = useState("");
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const navigation=useNavigation();
    useEffect(() => {
        const fetchFonts = async () => {
            // await loadFonts();
            setFontsLoaded(true);
        };
        fetchFonts();
    }, []);

    const handleSubmit = async () => {
        // try {
        //     // Save user details to AsyncStorage
        //     await AsyncStorage.setItem("userDetails", JSON.stringify({
        //         name,
        //         mobile,
        //         email,
        //         vehicleType,
        //         vehicleModel,
        //         location,
        //     }));

        //     // Mark the intro as completed
        //     await AsyncStorage.setItem("completedIntro", "true");

        //     // Navigate to home screen
        //    // router.push("/(root)/home");
        //     navigation.navigate(App);
        // } catch (error) {
        //     console.error("Error saving user details:", error);
        // }
    };

    if (!fontsLoaded) {
        return null; // Optionally, you can return a loading indicator here
    }

    return (
        
        <View style={styles.container}>
            {/* Image at the top */}
            <Image
                source={icons.logo} // Replace with your image URL
                style={styles.image}
                resizeMode="contain" // Adjusts the image to fit within the specified dimensions
            />
            
            <Text style={styles.header}>Enter Your Details</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Mobile"
                value={mobile}
                onChangeText={setMobile}
                style={styles.input}
                keyboardType="phone-pad"
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Vehicle Type (e.g., Bike or Car)"
                value={vehicleType}
                onChangeText={setVehicleType}
                style={styles.input}
            />
            <TextInput
                placeholder="Vehicle Model"
                value={vehicleModel}
                onChangeText={setVehicleModel}
                style={styles.input}
            />
            <TextInput
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
         
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    header: {
        fontSize: 24,
        fontFamily: 'JakartaBold', // Use JakartaBold font here
        textAlign: "center",
        marginBottom: 20,
        color:'#000000'
    },
    image: {
        width: "100%", // Make the image take the full width
        height: 100, // Adjust the height as needed
        marginBottom: 20, // Add some spacing below the image
    },
    input: {
        height: 60,
        borderColor:"#000000",
         textShadowColor:"#1B1212",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: "#ff3131",
        padding: 15,
        borderRadius: 50,
        marginHorizontal: 50,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
       // fontFamily: 'JakartaBold', // Use JakartaBold font here
    },
});

export default IntroScreen;