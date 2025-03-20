import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Trainerhomescreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                <Text style={styles.boldText}>Welcome,</Text>Trainer, now you can choose your clients to train their dogs and enjoy the PUPFORD App
            </Text>
            
            <Text style={styles.optionsTitle}>OPTIONS:</Text>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.optionButton}onPress={() => navigation.navigate('Usertrainerrequest')}>
                    <Text style={styles.buttonText}>REQUEST</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}onPress={() => navigation.navigate('Myclient')}>
                    <Text style={styles.buttonText}>MY CLIENT</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreText}></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7E7BE",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    welcomeText: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 30,
        color: "#000",
    },
    boldText: {
        fontWeight: "bold",
    },
    optionsTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textDecorationLine: "underline",
        marginBottom: 15,
        color: "#000",
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
    },
    optionButton: {
        backgroundColor: "#D9D9D9",
        paddingVertical: 15,
        width: "70%",
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    exploreButton: {
        backgroundColor: "#000",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 30,
    },
    exploreText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Trainerhomescreen;