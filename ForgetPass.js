import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import Login from './Login';

const ForgetPass = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
        <Icon name="arrow-back-circle-outline" size={30} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Forgot Password</Text>

      {/* Email Input */}
      <Text style={styles.label}>Email Address:</Text>
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#7F735F" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          placeholderTextColor="#888"
          keyboardType="email-address"
        />
      </View>

      {/* Send OTP Button */}
      <TouchableOpacity style={styles.otpButton}onPress={() => navigation.Navigate('OTPverify')}>
        <Text style={styles.otpButtonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6B8', 
    alignItems: 'center',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 50,
    marginTop: 50,
    color: 'black',
  },
  label: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7F735F',
    marginBottom: 20,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  otpButton: {
    backgroundColor: '#7F735F',
    width: '80%',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    marginTop: 50,
  },
  otpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
