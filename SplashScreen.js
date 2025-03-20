import React, {useEffect} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/applogo.png')} 
        style={styles.image}
      />
      <Text style={styles.text}>PUPFORD</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E6B8', 
  },
  image: {
    width: 300, 
    height: 350,
    marginBottom: 20,
    marginLeft: -30,
  },
  text: {
    fontSize: 28,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SplashScreen;
