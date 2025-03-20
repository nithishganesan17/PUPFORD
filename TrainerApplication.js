import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';

const TrainerApplication = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phone: '',
    gender: '',
    qualification: '',
    customQualification: '',
    experience: '',
    specialization: '',
    address: '',
    salary: '',
    email: '',
    location: '',
  });

  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);
const [resumeName, setResumeName] = useState('');


  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const pickResume = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setResume(res[0]);
      setResumeName(res[0].name); // Store the file name
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled document picker');
      } else {
        console.error('Error picking document:', err);
      }
    }
  };

  const handleSubmit = async () => {
    if (!photo || !resume) {
      Alert.alert('Error', 'Please upload both profile photo and resume.');
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('profile_photo', {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName,
    });
    data.append('resume', {
      uri: resume.uri,
      type: resume.type,
      name: resume.name,
    });

    try {
      const response = await fetch('http://192.168.196.174/myapp/applicationform.php', {
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const result = await response.json();
      if (result.success) {
        Alert.alert('Success', 'Application submitted successfully!');
        navigation.navigate('ApplicationStatusScreen', { formData });
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Failed to submit application. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TRAINER APPLICATION</Text>

      {/* Upload Photo */}
      <TouchableOpacity onPress={pickImage} style={styles.uploadContainer}>
        <Image source={photo ? { uri: photo.uri } : require('./assets/profilei.png')} style={styles.photo} />
        <Text>Upload Photo</Text>
      </TouchableOpacity>

      {/* Input Fields */}
      {['name', 'dob', 'phone', 'gender', 'experience', 'specialization', 'address', 'salary', 'email', 'location'].map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.toUpperCase()}
          value={formData[key]}
          onChangeText={(value) => handleInputChange(key, value)}
        />
      ))}

      {/* Qualification Picker */}
      <Picker
        selectedValue={formData.qualification}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('qualification', itemValue)}
      >
        <Picker.Item label="Select Qualification" value="" />
        <Picker.Item label="Canine Behavior and Psychology" value="Canine Behavior and Psychology" />
        <Picker.Item label="Professional Dog Training Certification Programs" value="Professional Dog Training Certification Programs" />
          <Picker.Item label="Business and Client Relations" value="Business and Client Relations" />
          <Picker.Item label="Canine Health & Nutrition" value="Canine Health & Nutrition" />
          <Picker.Item label="Puppy Training & Socialization" value="Puppy Training & Socialization" />
          <Picker.Item label="Specialized Dog Training" value="Specialized Dog Training" />
          <Picker.Item label="Basic & Advanced Obedience Training" value="Basic & Advanced Obedience Training" />
          <Picker.Item label="Learning Theory & Training Methods" value="Learning Theory & Training Methods" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      {formData.qualification === 'other' && (
        <TextInput
          style={styles.input}
          placeholder="Enter your qualification"
          value={formData.customQualification}
          onChangeText={(value) => handleInputChange('customQualification', value)}
        />
      )}

      {/* Upload Resume */}
<TouchableOpacity style={styles.uploadResumeButton} onPress={pickResume}>
  <Text style={styles.uploadResumeText}>UPLOAD RESUME (PDF)</Text>
</TouchableOpacity>

{resumeName ? <Text style={styles.fileName}>{resumeName}</Text> : null}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrainerApplication;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5E6B8' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  uploadContainer: { alignItems: 'center', marginBottom: 10 },
  photo: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ccc' },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 5, color: 'black' },
  picker: { height: 50, color: 'black' },
  uploadResumeButton: { backgroundColor: '#6A5ACD', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  uploadResumeText: { color: 'white', fontWeight: 'bold' },
  submitButton: { backgroundColor: 'black', padding: 12, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  submitText: { color: 'white', fontWeight: 'bold' },
  fileName: { textAlign: 'center', marginTop: 5, fontWeight: 'bold', color: 'black' },

});