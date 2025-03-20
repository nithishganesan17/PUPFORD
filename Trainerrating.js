import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // for back button and icons
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // for stars

const TrainerProfile = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      {/* Profile Card */}
      <View style={styles.card}>
        <Image
          source={{ uri: './assets/applogo.png' }} // Replace with trainer's image
          style={styles.profileImage}
        />

        <Text style={styles.trainerName}>
          <Icon name="user" size={16} color="black" /> kumar
        </Text>

        <Text style={styles.trainerLocation}>
          <Icon name="map-pin" size={16} color="black" /> Barugur, TAMIL NADU
        </Text>

        {/* Review Section */}
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>REVIEW:</Text>

          <View style={styles.reviewCard}>
            {/* Stars */}
            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, index) => (
                <FontAwesome
                  key={index}
                  name="star-o"
                  size={16}
                  color="#000"
                  style={styles.starIcon}
                />
              ))}
            </View>

            {/* Reviewer Name */}
            <Text style={styles.reviewerName}>HARISH</Text>

            {/* Review Text */}
            <Text style={styles.reviewText}>
              I recently tried this app to train my golden retriever dog and alloted a personal trainer to take care my dog
            </Text>

            {/* Footer */}
            <View style={styles.reviewFooter}>
              <Text style={styles.reviewerNameFooter}>HARISH</Text>
              <Text style={styles.reviewDate}>3.04.2023</Text>
            </View>
          </View>
        </View>

        {/* Pay Button */}
        <TouchableOpacity style={styles.payButton}onPress={() => navigation.navigate('Userdetailsfortrainer')}>
          <Text style={styles.payButtonText}>BOOK</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TrainerProfile;
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#EBD9A9', // Soft yellow-beige background
      paddingTop: 50,
      paddingHorizontal: 20,
    },
    backButton: {
      position: 'absolute',
      top: 50,
      left: 20,
      zIndex: 1,
    },
    card: {
      backgroundColor: '#D9D9D9', // Grayish background for card
      borderRadius: 20,
      paddingVertical: 30,
      paddingHorizontal: 20,
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 50,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
    },
    trainerName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 5,
    },
    trainerLocation: {
      fontSize: 14,
      color: '#000',
      marginBottom: 20,
    },
    reviewContainer: {
      alignSelf: 'stretch',
    },
    reviewTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 10,
    },
    reviewCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    starsContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    starIcon: {
      marginRight: 5,
    },
    reviewerName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 10,
    },
    reviewText: {
      fontSize: 13,
      color: '#000',
      marginBottom: 10,
    },
    reviewFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    reviewerNameFooter: {
      fontSize: 12,
      color: '#000',
    },
    reviewDate: {
      fontSize: 12,
      color: '#000',
    },
    payButton: {
      marginTop: 20,
      backgroundColor: '#8C82FC', // Purple button color
      borderRadius: 25,
      paddingVertical: 12,
      paddingHorizontal: 60,
      alignItems: 'center',
    },
    payButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  