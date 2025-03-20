import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const DogProfile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You cancelled image selection.');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setProfilePic(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    if (!name || !selectedGender || !profilePic) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    let formData = new FormData();
    formData.append('name', name);
    formData.append('gender', selectedGender);
    formData.append('profile_pic', {
      uri: profilePic,
      type: 'image/jpeg',
      name: 'profile.jpg',
    });

    try {
      const response = await fetch('http://192.168.196.174/myapp/dogprofile.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      if (data.status === 'success') {
        Alert.alert('Success', 'Profile saved successfully!');
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PUPFORD</Text>

      {/* Profile Picture */}
      <TouchableOpacity onPress={pickImage}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.image} />
        ) : (
          <Image source={require('./assets/applogo.png')} style={styles.image} />
        )}
      </TouchableOpacity>

      {/* Pet Name Input */}
      <Text style={styles.label}>What is your pet's name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Eg. ALAN"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
      />

      {/* Gender Selection */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'Male' && styles.selectedGender]}
          onPress={() => setSelectedGender('Male')}
        >
          <Text style={[styles.genderText, selectedGender === 'Male' && styles.selectedGenderText]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'Female' && styles.selectedGender]}
          onPress={() => setSelectedGender('Female')}
        >
          <Text style={[styles.genderText, selectedGender === 'Female' && styles.selectedGenderText]}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E0A6',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  genderButton: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 20,
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  genderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedGender: {
    backgroundColor: 'black',
  },
  selectedGenderText: {
    color: 'white',
  },
  nextButton: {
    backgroundColor: 'black',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DogProfile;