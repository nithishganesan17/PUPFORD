import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [trainingType, setTrainingType] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const dogBreeds = ['Labrador', 'German Shepherd', 'Huskey', 'Golden Retriever', 'Beagle'];

  const handleSearch = (text) => {
    setSearchText(text);
    setShowOptions(true);
  };

  const toggleOptions = () => {
    setShowOptions(true);
  };

  const handleSelectBreed = (breed) => {
    setSearchText(breed);
    setSelectedBreed(breed);
    setShowOptions(false); // Hide options after selection
  };

  const handleSelectTraining = (type) => {
    setTrainingType(type);
  };

  const navigateToTraining = () => {
    if (!selectedBreed) {
      alert('Please select a breed first.');
      return;
    }
    if (!trainingType) {
      alert('Please select a training type.');
      return;
    }

    const breedScreens = {
      'Labrador': 'LabradorTrainingScreen',
      'German Shepherd': 'GermanTrainingScreen',
      'Husky': 'HuskeyTrainingScreen',
      'Golden Retriever': 'GoldenTrainingScreen',
      'Beagle': 'BeagleTrainingScreen',
    };

    const screenName = breedScreens[selectedBreed];

    if (screenName) {
      navigation.navigate(screenName, { breed: selectedBreed, trainingType });
    } else {
      alert('Training screen not available for this breed.');
    }
  };

  const filteredBreeds = dogBreeds.filter((breed) =>
    searchText ? breed.toLowerCase().startsWith(searchText.toLowerCase()) : true
  );

  return (
    <View style={styles.container}>
    

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>WELCOME, To the pupford app</Text>
      <Text style={styles.subText}>Train your dogs and enjoy</Text>

      {/* Search Input Container - Click Anywhere */}
      <Text style={styles.label}>Enter your dog breed:</Text>
      <TouchableOpacity style={styles.inputContainer} onPress={toggleOptions}>
        <TextInput
          style={styles.input}
          placeholder="E.g: German Shepherd"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={handleSearch}
        />
        <Icon name="search-outline" size={20} color="#7F735F" />
      </TouchableOpacity>

      {/* Select Breed (Only show when search input is clicked) */}
      {showOptions && (
        <FlatList
          data={filteredBreeds}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.optionButton, selectedBreed === item && styles.selectedOption]}
              onPress={() => handleSelectBreed(item)}
            >
              <Text style={[styles.optionText, selectedBreed === item && styles.selectedOptionText]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Training Type Selection */}
      <Text style={styles.sectionTitle}>Select Training Type:</Text>
      <View style={styles.trainingContainer}>
        <TouchableOpacity
          style={[styles.trainingButton, trainingType === 'self' && styles.selectedTraining]}
          onPress={() => handleSelectTraining('self')}
        >
          <Text style={[styles.trainingText, trainingType === 'self' && styles.selectedTrainingText]}>SELF TRAINING</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity
          style={[styles.trainingButton, trainingType === 'trainer' && styles.selectedTraining]}
          onPress={() => handleSelectTraining('trainer')}
        >
          <Text style={[styles.trainingText, trainingType === 'trainer' && styles.selectedTrainingText]}>ALLOTE TRAINER</Text>
        </TouchableOpacity>
      </View>

      {/* Start Training Button */}
      <TouchableOpacity style={styles.startButton} onPress={navigateToTraining}>
        <Text style={styles.startButtonText}>START TRAINING</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6B8',
    paddingTop: 40,
    alignItems: 'center',
  },
  
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'black',
  },
  subText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  label: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7F735F',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 5,
    color: 'black',
  },
  optionButton: {
    backgroundColor: '#D3C5AC',
    width: '90%',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: 'black',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedOptionText: {
    color: 'white',
  },
  trainingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#F5E6B8',
    padding: 10,
    borderRadius: 15,
  },
  trainingButton: {
    backgroundColor: '#8B866C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  selectedTraining: {
    backgroundColor: 'black',
  },
  trainingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedTrainingText: {
    color: '#F5E6B8',
  },
  orText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  startButton: {
    backgroundColor: 'black',
    width: '80%',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
