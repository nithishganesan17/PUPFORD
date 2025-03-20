import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";

const Editprofile = () => {
  const [dogName, setDogName] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigation = useNavigation();

  // Fetch profile details on component mount
  useEffect(() => {
    fetch("http://192.168.196.174/myapp/fetchdogprofile.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setDogName(data.profile.name);
          setGender(data.profile.gender);
          setProfileImage(`http://192.168.196.174/myapp/uploads/${data.profile.profile_pic}`);
        } else {
          Alert.alert("Error", "Failed to fetch profile details");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "Network request failed!");
        setLoading(false);
      });
  }, []);

  // Function to choose an image from the gallery
  const chooseImage = () => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert("Cancelled", "No image selected");
      } else if (response.error) {
        Alert.alert("Error", response.error);
      } else {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!dogName || !gender) {
      Alert.alert("Error", "Please fill in all details.");
      return;
    }

    setUpdating(true); // Start loading

    const formData = new FormData();
    formData.append("name", dogName);
    formData.append("gender", gender);

    if (profileImage) {
      formData.append("profile_pic", {
        uri: profileImage,
        type: "image/jpeg",
        name: "profile.jpg",
      });
    }

    fetch("http://192.168.196.174/myapp/updateprofile.php", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          Alert.alert("Success", "Profile updated successfully!");
          navigation.navigate("Homemenu", { refresh: true }); // Refresh the HomeMenu screen
        } else {
          Alert.alert("Error", data.message || "Failed to update profile");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        Alert.alert("Error", "Network request failed!");
      })
      .finally(() => {
        setUpdating(false); // Stop loading
      });
  };

  // Show loading indicator while fetching profile
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#757B57" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require("./assets/applogo.png")
          }
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon} onPress={chooseImage}>
          <Text style={styles.editText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Dog Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter the dog name"
        value={dogName}
        onChangeText={setDogName}
      />

      {/* Gender Selection */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "Male" && styles.selectedGender,
          ]}
          onPress={() => setGender("Male")}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "Female" && styles.selectedGender,
          ]}
          onPress={() => setGender("Female")}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={updating} // Disable button while updating
      >
        {updating ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.submitText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1E6B2",
    padding: 20,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    marginTop: 60,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000",
  },
  editIcon: {
    position: "absolute",
    right: -5,
    bottom: -5,
    backgroundColor: "#757B57",
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  editText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    width: "90%",
    backgroundColor: "#FFF",
  },
  genderContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  genderButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    margin: 5,
    backgroundColor: "#FFF",
  },
  selectedGender: {
    backgroundColor: "#757B57",
  },
  genderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Editprofile;