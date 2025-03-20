
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Menu, Provider } from 'react-native-paper';

const Login = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

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
            <Menu.Item onPress={() => navigation.navigate('TrainerLogin')} title="Trainer Login" />
            <Menu.Item onPress={() => navigation.navigate('Login')} title="User Login" />
          </Menu>
        </View>

        {/* Profile Image */}
        <Image source={require('./assets/applogo.png')} style={styles.profileImage} />

        {/* Login Text */}
        <Text style={styles.loginText}>Admin Login</Text>
        <Text style={styles.subtitle}>Please sign-in to continue</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="E-mail ID" />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        </View>



        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('AdminDashboard')}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

       

      </View>
    </Provider>
  );
};

export default Login;

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
    marginLeft: -30,
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
    fontWeight: 'semibold',
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

});
