import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TrainersScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>TRAINERS</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.trainerCard}>
          <View style={styles.trainerRow}>
            <Icon name="person" size={12} color="#000" style={styles.icon} />
            <Text style={styles.trainerText}> Srikanth</Text>
          </View>

        

          <View style={styles.trainerRow}>
            <Icon name="location-on" size={12} color="#000" style={styles.icon} />
            <Text style={styles.trainerText}> CHENNAI, TAMIL NADU</Text>
          </View>

          <View style={styles.trainerRow}>
            <Icon name="pets" size={16} color="#000" style={styles.icon} />
            <Text style={styles.trainerText}> puppy train</Text>
          </View>

          <View style={styles.trainerRow}>
            <Icon name="attach-money" size={16} color="#000" style={styles.icon} />
            <Text style={styles.trainerText}> 15,000Rs/month</Text>
          </View>

          <View style={styles.trainerRow}>
            <Icon name="phone" size={16} color="#000" style={styles.icon} />
            <Text style={styles.trainerText}>9363584566</Text>
          </View>

          <Text style={styles.dateText}>
            Date: 25-04-2025, Time: 5:30 PM
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrainersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E8A8', // Light yellow background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  scrollContainer: {
    padding: 16,
  },
  trainerCard: {
    backgroundColor: '#D9D9D9', // Light gray card
    borderRadius: 12,
    padding: 16,
  },
  trainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    marginRight: 6,
  },
  trainerText: {
    fontSize: 11,
    color: '#000',
  },
  dateText: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: '600',
    color: '#000',
  },
});
