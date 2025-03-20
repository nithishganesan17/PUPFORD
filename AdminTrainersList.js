import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const AdminTrainerList = ({ navigation }) => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedTrainers();
  }, []);

  const fetchApprovedTrainers = async () => {
    try {
      const response = await fetch('http://192.168.196.174/myapp/admintrainerlist.php', {
        method: 'POST', // As your PHP expects POST
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Response:', data);

      if (data.success) {
        setTrainers(data.trainers);
      } else {
        alert(data.message || 'Failed to fetch trainers');
      }
    } catch (error) {
      console.error('Error fetching trainers:', error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
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

      <Text style={styles.heading}>Approved Trainers</Text>

      {trainers.length > 0 ? (
        trainers.map((trainer, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={
                trainer.profile_photo
                  ? { uri: `http://192.168.196.174/myapp/${trainer.profile_photo}` }
                  : require('./assets/applogo.png') // replace with your fallback image
              }
              style={styles.image}
            />

            <View style={styles.details}>
              <Text style={styles.text}><Text style={styles.bold}>Name:</Text> {trainer.name}</Text>
              <Text style={styles.text}><Text style={styles.bold}>Location:</Text> {trainer.location}</Text>
              <Text style={styles.text}><Text style={styles.bold}>Specialization:</Text> {trainer.specialization}</Text>
              <Text style={styles.text}><Text style={styles.bold}>Salary:</Text> {trainer.salary} Rs/month</Text>
              <Text style={styles.text}><Text style={styles.bold}>Phone:</Text> {trainer.phone}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>No approved trainers found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4E3B2', // Light beige background
    alignItems: 'center',
    paddingVertical: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'black',
    marginVertical: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 10,
  },
  backArrow: {
    fontSize: 24,
    color: 'black',
  },
  card: {
    backgroundColor: '#E6E6E6', // Light grey background
    width: '90%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'black',
  },
  details: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  noData: {
    fontSize: 16,
    color: 'black',
    marginTop: 30,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminTrainerList;
