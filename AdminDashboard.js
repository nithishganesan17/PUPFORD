import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AdminDashboard = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                <Text style={styles.boldText}>Welcome,</Text>Admin, now you can explore the trainers status and your App
            </Text>
            
            <Text style={styles.optionsTitle}>OPTIONS:</Text>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.optionButton}onPress={() => navigation.navigate('AdminTrainersList')}>
                    <Text style={styles.buttonText}>TRAINERS LIST</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton }onPress={() => navigation.navigate('AdminTrainerRequest')}>
                    <Text style={styles.buttonText}>NEW REQUESTS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}onPress={() => navigation.navigate('AdminTrainersList')}>
                    <Text style={styles.buttonText}>TRAINERS STATUS</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.exploreButton}onPress={() => navigation.navigate('AdminExplore')}>
                <Text style={styles.exploreText}>EXPLORE APP</Text>
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
        fontSize: 24,
        textAlign: "center",
        marginBottom: 300,
        marginTop: 0,
        color: "#000",
    },
    boldText: {
        fontWeight: "bold",
    },
    optionsTitle: {
        fontSize: 28,
        fontWeight: "bold",
        textDecorationLine: "underline",
        marginBottom: 25,
        marginTop: -185,
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
        marginTop: 190,
    },
    exploreText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AdminDashboard;
