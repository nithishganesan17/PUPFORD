import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Non-expo icon import

const UserTrainerRequest = ({ navigation }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://192.168.196.174/myapp/fetchuserdetails.php');
      const json = await response.json();

      if (json.status === 'success') {
        setRequests(json.data);
      } else {
        Alert.alert('No Requests', json.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not fetch requests');
      console.error(error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await fetch('http://192.168.196.174/myapp/approve_request.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      const json = await response.json();

      if (json.status === 'success') {
        Alert.alert('Accepted', `Request ID: ${id} has been accepted.`);
        fetchRequests(); // Refresh the list
      } else {
        Alert.alert('Error', json.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to accept request.');
      console.error(error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const response = await fetch('http://192.168.196.174/myapp/decline_request.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      const json = await response.json();

      if (json.status === 'success') {
        Alert.alert('Declined', `Request ID: ${id} has been declined.`);
        fetchRequests(); // Refresh the list
      } else {
        Alert.alert('Error', json.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to decline request.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.heading}>REQUESTS</Text>

      <Text style={styles.subHeading}>NEW REQUESTS:</Text>

      <ScrollView style={styles.scrollContainer}>
        {requests.length > 0 ? (
          requests.map((item) => (
            <View key={item.id} style={styles.requestBox}>
              <Text style={styles.requestText}>Name: {item.name}</Text>
              <Text style={styles.requestText}>Location: {item.location}</Text>
              <Text style={styles.requestText}>Breed: {item.breed}</Text>
              <Text style={styles.requestText}>Date: {item.date}</Text>
              <Text style={styles.requestText}>Time: {item.time}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.acceptButton}onPress={() => handleAccept(item.id)}>
                <Text style={styles.acceptText}>ACCEPT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.declineButton}onPress={() => handleDecline(item.id)}>
                <Text style={styles.declineText}>DECLINE</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noRequests}>No pending requests</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default UserTrainerRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6B8',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 20,
    width: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  requestBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  requestText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  declineButton: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  acceptText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  declineText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noRequests: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
});
