import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const LogoutScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Logout Confirmation Box */}
      <View style={styles.logoutBox}>
        <Text style={styles.logoutText}>Are you sure, you want to</Text>
        <Text style={styles.logoutBoldText}>LOGOUT?</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('HomeScreen')} 
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  logoutBox: {
    backgroundColor: '#D3D3D3',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '400',
  },
  logoutBoldText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
