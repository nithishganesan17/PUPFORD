import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const Homemenu = () => {
  const navigation = useNavigation();
  const [dogProfile, setDogProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.196.174/myapp/fetchdogprofile.php"
      );
      const data = await response.json();
      console.log("API Response:", data);

      if (data.status === "success" && data.profile) {
        setDogProfile(data.profile);
      } else {
        Alert.alert("Error", "Failed to load profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      Alert.alert("Error", "Network request failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear session or token here (if applicable)
    // For example, you can use AsyncStorage to clear stored tokens
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          // Navigate to the login screen
          navigation.replace("Login");
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#757B57" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Icon name="arrow-back-outline" size={30} color="black" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>MENU</Text>

        {dogProfile ? (
          <>
            <Image
              source={{
                uri: `http://192.168.196.174/myapp/uploads/${dogProfile.profile_pic}?t=${new Date().getTime()}`,
              }}
              style={styles.profileImage}
              onError={() =>
                Alert.alert("Error", "Failed to load profile picture")
              }
            />
            <Text style={styles.text}>NAME: {dogProfile.name}</Text>
            <Text style={styles.text}>GENDER: {dogProfile.gender}</Text>
          </>
        ) : (
          <Text style={styles.text}>No profile found</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Editprofile")}
        >
          <Text style={styles.buttonText}>EDIT PROFILE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Aboutus")}>
          <Text style={styles.buttonText}>ABOUT US</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Yourtrainer")}>
          <Text style={styles.buttonText}>YOUR TRAINER</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1E6B2",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#757B57",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#D9534F", // Red color for logout button
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
});

export default Homemenu;