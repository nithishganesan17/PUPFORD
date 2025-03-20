import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Linking,
} from "react-native";

const AdminTrainerRequest = ({ navigation }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        "http://192.168.196.174/myapp/admintrainerrequest.php"
      );
      const data = await response.json();
      console.log("Backend Response:", data); // Log the response
      if (data.success) {
        setApplications(data.data);
      } else {
        console.error("No applications found");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (email) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('action', 'approve');
  
      const response = await fetch('http://192.168.196.174/myapp/adminapprove.php', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert('Application approved successfully.');
        // Refresh the application list or update the UI
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error approving application:', error);
      alert('Failed to approve application.');
    }
  };
  
  const handleReject = async (email) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('action', 'reject');
  
      const response = await fetch('http://192.168.196.174/myapp/adminapprove.php', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert('Application rejected successfully.');
        // Refresh the application list or update the UI
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Failed to reject application.');
    }
  };

  const handleViewResume = (resumeUrl) => {
    console.log("Viewing Resume:", resumeUrl);
    if (resumeUrl) {
      Linking.openURL(`http://192.168.196.174/myapp/${resumeUrl}`).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    } else {
      console.error("Resume URL is missing");
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="black" style={styles.loader} />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Trainer Requests:</Text>

      {applications.length > 0 ? (
        applications.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.profileContainer}>
              <Image
                source={
                  item.profile_photo
                    ? {
                        uri: `http://192.168.196.174/myapp/${item.profile_photo}`,
                      }
                    : require("./assets/applogo.png")
                }
                style={styles.image}
              />
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.text}>
                <Text style={styles.bold}>Name:</Text> {item.name || "N/A"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Date of Birth:</Text>{" "}
                {item.date_of_birth || "N/A"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Phone no:</Text> {item.phone || "N/A"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Email:</Text> {item.email || "N/A"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Gender:</Text> {item.gender || "N/A"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Location:</Text> {item.location || "N/A"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Experience:</Text>{" "}
                {item.experience ? `${item.experience} years` : "N/A"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Qualification:</Text>{" "}
                {item.qualification || "N/A"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Specialization:</Text>{" "}
                {item.specialization || "N/A"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Address:</Text> {item.address || "N/A"}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Salary:</Text> {item.salary || "N/A"}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.viewResumeButton}
                onPress={() => handleViewResume(item.resume)}
              >
                <Text style={styles.buttonText}>VIEW RESUME</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.approveButton}
                onPress={() => handleApprove(item.email)}
              >
                <Text style={styles.buttonText}>APPROVE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={() => handleReject(item.email)}
              >
                <Text style={styles.buttonText}>REJECT</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No applications found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#F4E3B2", // Light beige background
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "black",
    marginTop: 30,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 10,
    zIndex: 10,
    padding: 5,
  },
  backArrow: {
    fontSize: 24,
    color: "black",
  },
  card: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
  },
  detailsContainer: {
    alignItems: "flex-start",
    width: "100%",
  },
  text: {
    fontSize: 14,
    color: "black",
    marginVertical: 2,
  },
  bold: {
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  viewResumeButton: {
    backgroundColor: "black",
    padding: 10,
    width: "90%",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  approveButton: {
    backgroundColor: "green",
    padding: 10,
    width: "90%",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  rejectButton: {
    backgroundColor: "red",
    padding: 10,
    width: "90%",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "black",
    marginTop: 20,
  },
});

export default AdminTrainerRequest;