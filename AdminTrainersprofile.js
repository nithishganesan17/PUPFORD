import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AdminTrainersprofile = ({ route }) => {
  const navigation = useNavigation();
  const { trainer } = route.params || {}; // Get trainer details from navigation params

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>TRAINERS LIST</Text>

      <View style={styles.profileCard}>
        <Text style={styles.profileDetails}>PROFILE DETAILS:</Text>

        <Image source={{ uri: trainer.profile_photo }} style={styles.profileImage} />

        <Text style={styles.infoText}>Name: {trainer.name}</Text>
        <Text style={styles.infoText}>Date of Birth: {trainer.dob}</Text>
        <Text style={styles.infoText}>Phone: {trainer.phone}</Text>
        <Text style={styles.infoText}>E-Mail: {trainer.email}</Text>
        <Text style={styles.infoText}>Gender: {trainer.gender}</Text>
        <Text style={styles.infoText}>Location: {trainer.location}</Text>
        <Text style={styles.infoText}>Experience: {trainer.experience} years</Text>
        <Text style={styles.infoText}>Qualification: {trainer.qualification}</Text>
        <Text style={styles.infoText}>Address: {trainer.address}</Text>
        <Text style={styles.infoText}>Salary: {trainer.salary} Rs/month</Text>

        <TouchableOpacity style={styles.viewResumeButton}>
          <Text style={styles.viewResumeText}>VIEW RESUME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminTrainersprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E6B8",
    alignItems: "center",
    paddingTop: 30,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 10,
    padding: 10,
  },
  backText: {
    fontSize: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  profileCard: {
    backgroundColor: "white",
    width: "85%",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  profileDetails: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    backgroundColor: "#ddd",
  },
  infoText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 2,
  },
  viewResumeButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "90%",
    alignItems: "center",
  },
  viewResumeText: {
    color: "white",
    fontWeight: "bold",
  },
});
