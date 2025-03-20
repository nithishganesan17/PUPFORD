import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Back Icon
import { useNavigation } from '@react-navigation/native';

const AboutUs = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={30} color="black" />
      </TouchableOpacity>

      {/* About Us Heading */}
      <Text style={styles.heading}>My Client</Text>

      {/* Visit Section */}
      <Text style={styles.visitText}>
        <Text style={styles.boldText}></Text>
      </Text>

      {/* Website Link */}
      <TouchableOpacity onPress={() => Linking.openURL('https://www.pupford.com')}>
        <Text style={styles.linkText}>Still no one approved by you </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6B8', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    marginBottom: 40,
  },
  visitText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 20,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    color: 'black',
  },
});
