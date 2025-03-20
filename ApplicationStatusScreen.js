import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';

const ApplicationStatusScreen = ({ navigation }) => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch application status and details
  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        // Fetch application data
        const response = await fetch('http://192.168.196.174/myapp/applicationstatus.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();

        if (result.success) {
          setApplication(result.data); // Set the application data

          // Navigate to TrainerHomeScreen if status is APPROVED
          if (result.data.status === 'approved') {
            navigation.navigate('Trainerhomescreen');
          }
        } else {
          Alert.alert('Error', result.message);
        }
      } catch (error) {
        console.error('Error fetching application status:', error);
        Alert.alert('Error', 'Failed to fetch application status.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationStatus();
  }, [navigation]);

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Show message if no application is found
  if (!application) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>No Application Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>APPLICATION STATUS</Text>

      <View style={styles.card}>
        <Text style={styles.subHeader}>PROFILE DETAILS:</Text>

        {/* Display profile photo or a default logo */}
        <Image
          source={
            application.profile_photo
              ? { uri: `http://192.168.196.174/myapp/uploads/${application.profile_photo}` }
              : require('./assets/applogo.png')
          }
          style={styles.photo}
        />

        {/* Display application details */}
        {Object.entries(application).map(([key, value]) => {
          if (key === 'profile_photo' || key === 'resume') return null; // Skip photo and resume
          return (
            <Text key={key} style={styles.details}>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
            </Text>
          );
        })}

        {/* Display status button or rejected message */}
        {application.status === 'rejected' ? (
          <View style={[styles.statusButton, styles.rejectedButton]}>
            <Text style={[styles.statusText, styles.rejectedText]}>REJECTED</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.statusButton,
              application.status === 'pending' && styles.pendingButton,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                application.status === 'pending' && styles.pendingText,
              ]}
            >
              {application.status}
            </Text>
          </TouchableOpacity>
        )}

        {/* Cancel Button (only for PENDING status) */}
        {application.status === 'pending' && (
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>CANCEL</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ApplicationStatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6B8',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  subHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    marginBottom: 5,
  },
  statusButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  pendingButton: {
    backgroundColor: '#BDB76B', // Yellow for pending
  },
  pendingText: {
    color: 'black',
    fontWeight: 'bold',
  },
  rejectedButton: {
    backgroundColor: '#F44336', // Red for rejected
  },
  rejectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontWeight: 'bold',
  },
});