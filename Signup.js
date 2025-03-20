import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      let response = await fetch('http://192.168.196.174/myapp/usersignup.php', { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          confirm_password: confirmPassword,
        }),
      });

      let textResponse = await response.text(); 
      console.log("Raw Response:", textResponse);

      let json = JSON.parse(textResponse); 

      if (json.status === "success") {
        Alert.alert("Success", "User registered successfully");
        navigation.navigate("Login");
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
      <Text style={styles.title}>User Sign-Up</Text>
      <Text style={styles.subtitle}>Please register to login</Text>

      <View style={styles.inputContainer}>
        <Icon name="mail" size={20} color="black" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="E-mail ID" 
          placeholderTextColor="#888" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-closed" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon name={passwordVisible ? 'eye' : 'eye-off'} size={20} color="black" style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-closed" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          <Icon name={confirmPasswordVisible ? 'eye' : 'eye-off'} size={20} color="black" style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5E6B8', alignItems: 'center', paddingTop: 50 },
  logo: { width: 150, height: 150, borderRadius: 75, marginBottom: 20 },
  title: { fontSize: 30, fontWeight: 'bold', fontStyle: 'italic', color: 'black' },
  subtitle: { fontSize: 18, color: '#555', marginBottom: 20, fontWeight: '600' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10, borderRadius: 10, width: '90%', marginVertical: 8, elevation: 2 },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: 'black' },
  eyeIcon: { marginLeft: 10 },
  button: { backgroundColor: 'black', width: '80%', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 20 },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText:  { fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', color: 'black' },
  footerLink: { fontSize: 18, color: '#007BFF', fontWeight: 'bold' },
});

export default Signup;
