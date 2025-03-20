import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Menu, Provider } from 'react-native-paper';

const TrainerLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);

    try {
      let response = await fetch('http://192.168.196.174/myapp/trainerlogin.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      let textResponse = await response.text(); // Get raw response
      console.log('Raw Response:', textResponse);

      let json = JSON.parse(textResponse); // Try parsing JSON

      if (json.status === 'success') {
        if (json.redirect === 'ApplicationStatusScreen') {
          navigation.navigate('ApplicationStatusScreen');
        } else {
          navigation.navigate('TrainerApplication');
        }
      } else {
        Alert.alert('Error', json.message);
      }
    } catch (error) {
      console.error('Network error:', error);
      Alert.alert('Network Error', 'Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        {/* Menu Icon on Top-Right */}
        <View style={styles.menuContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Icon name="menu" size={30} color="black" />
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={() => navigation.navigate('Login')} title="User Login" />
          </Menu>
        </View>

        {/* Profile Image */}
        <Image source={require('./assets/applogo.png')} style={styles.profileImage} />

        {/* Login Text */}
        <Text style={styles.loginText}>Trainer Login</Text>
        <Text style={styles.subtitle}>Please sign in to continue</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail ID"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginButtonText}>{loading ? 'Log in' : 'Log in'}</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>New Trainer ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('TrainerSignup')}>
            <Text style={styles.signupText}>Sign-up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Provider>
  );
};

export default TrainerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6B8',
    alignItems: 'center',
    paddingTop: 50,
  },
  menuContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 2,
    alignSelf: 'center',
  },
  loginText: {
    fontSize: 34,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 22,
    color: '#555',
    marginBottom: 20,
    fontWeight: '600',
  },
  inputContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
  },
  input: {
    fontSize: 17,
    color: 'black',
  },
  loginButton: {
    backgroundColor: 'black',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerContainer: { 
    flexDirection: 'row', 
    width: -40,
    alignItems: 'center', 
    justifyContent: 'center', 
    marginLeft: -10
  },
  footerText: { 
    flex: 1,
    fontSize: 18, 
    color: 'black', 
    alignSelf: 'center', // Ensures the text stays visible
    marginTop: 2, 
    marginLeft: 100, 
    textAlign: 'center', 
  },
  signupText: {
    marginRight:160,
    fontSize: 19, 
    color: '#007BFF', 
    fontWeight: 'bold' 
  },
});