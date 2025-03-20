import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet,
} from 'react-native';

const TrainerSignup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      let response = await fetch('http://192.168.196.174/myapp/trainersignup.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }),
      });

      let json = await response.json();
      console.log(json);

      if (json.status === "success") {
        Alert.alert("Success", json.message);
        navigation.replace("TrainerLogin");
      } else {
        Alert.alert("Error", json.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert("Network error", "Failed to connect to the server.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/applogo.png')} style={styles.logo} />
      <Text style={styles.title}>Trainer Sign-Up</Text>
      <Text style={styles.subtitle}>Please register to login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail ID"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.loginText} onPress={() => navigation.navigate('TrainerLogin')}>
          Log in
        </Text>
      </Text>
    </View>
  );
};

export default TrainerSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#F5E6B8',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,paddingTop: 50
  },
  title: { fontSize: 30, fontWeight: 'bold', fontStyle: 'italic', color: 'black' },
  subtitle: { fontSize: 18, color: '#555', marginBottom: 20, fontWeight: '600' },
  input: {
    width: '90%',
    padding: 18,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  signupButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText:  { fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', color: 'black',padding:25 },
  loginText: { fontSize: 18, color: '#007BFF', fontWeight: 'bold',paddingTop:50 },
});
