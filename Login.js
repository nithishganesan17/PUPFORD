import React, { useState } from 'react'; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Menu, Provider } from 'react-native-paper';

const Login = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required");
      return;
    }

    try {
      let response = await fetch('http://192.168.196.174/myapp/userlogin.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      let json = await response.json();
      console.log(json);

      if (json.status === "success") {
        Alert.alert("Success", json.message);

        if (json.role === "admin") {
          navigation.replace("AdminDashboard");
        } else if(json.hasDogProfile=true) {
          navigation.replace("HomeScreen");
        }else if(json.hasDogProfile=false) {
          navigation.replace("DogProfile");
        }
      } else {
        Alert.alert("Error", json.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert("Network error", "Failed to connect to the server. Check your API URL.");
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        {/* Menu Icon */}
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
            <Menu.Item onPress={() => navigation.navigate('TrainerLogin')} title="Trainer Login" />
          </Menu>
        </View>

        {/* Profile Image */}
        <Image source={require('./assets/applogo.png')} style={styles.profileImage} />

        {/* Login Text */}
        <Text style={styles.loginText}>UserLogin</Text>
        <Text style={styles.subtitle}>Please sign-in to continue</Text>

        {/* Email Input */}
<View style={styles.inputContainer}>
  <TextInput 
    style={styles.input} 
    placeholder="E-mail ID"
    placeholderTextColor="#888"  
    value={email}
    onChangeText={setEmail}
  />
</View>

{/* Password Input */}
<View style={styles.inputContainer}>
  <TextInput 
    style={styles.input} 
    placeholder="Password" 
    placeholderTextColor="#888"  
    value={password}
    onChangeText={setPassword}
  />
</View>


        {/* Forgot Password */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
  <Text style={styles.footerText}>New User ? </Text>
  <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
    <Text style={styles.signupText}>Sign-up</Text>
  </TouchableOpacity>
</View>
</View>
</Provider>
);
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5E6B8', 
    alignItems: 'center', 
    paddingTop: 50 
  },
  menuContainer: { 
    position: 'absolute', 
    top: 20, 
    right: 20 
  },
  profileImage: { 
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    marginBottom: 10, 
    alignSelf: 'center' 
  },
  loginText: { 
    fontSize: 34, 
    fontWeight: 'bold', 
    fontStyle: 'italic', 
    marginBottom: 5 
  },
  subtitle: { 
    fontSize: 22, 
    color: '#555', 
    marginBottom: 20, 
    fontWeight: '600' 
  },
  inputContainer: { 
    width: '90%', 
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 10, 
    marginVertical: 8, 
    elevation: 2 
  },
  input: { 
    fontSize: 17 
  },
  optionsContainer: { 
    width: '90%', 
    marginTop: 5, 
    alignItems: 'flex-end' 
  },
  forgotPassword: { 
    fontSize: 17, 
    color: '#007BFF', 
    fontWeight: 'bold', 
    textAlign: 'right', 
    marginRight: 10 
  },
  loginButton: { 
    backgroundColor: 'black', 
    width: '80%', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginVertical: 20 
  },
  loginButtonText: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  footerContainer: { 
    flexDirection: 'row', 
    width: -40,
    alignItems: 'center', 
    justifyContent: 'center', 
    marginLeft: -0
  },
  footerText: { 
    flex: 1,
    fontSize: 18, 
    color: 'black', 
    alignSelf: 'center', 
    marginTop: 2, 
    marginLeft: 100, 
    textAlign: 'center' 
  },
  signupText: {
    marginRight:160,
    fontSize: 19, 
    color: '#007BFF', 
    fontWeight: 'bold' 
  },
});

export default Login;