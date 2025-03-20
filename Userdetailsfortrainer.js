import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";

const Userdetailsfortrainer = ({ navigation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [breed, setBreed] = useState("");
  const [contact, setContact] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, time) => {
    if (time) {
      setSelectedTime(time);
    }
    setShowTimePicker(false);
  };

  const handleSubmit = async () => {
    if (!name || !location || !breed || !contact || !selectedDate || !selectedTime) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const formattedTime = selectedTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Prepare data
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('breed', breed);
    formData.append('contact', contact);
    formData.append('date', selectedDate);
    formData.append('time', formattedTime);

    try {
      const response = await fetch('http://192.168.196.174/myapp/userdetails.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const result = await response.json();
      console.log(result);

      if (result.status === "success") {
        Alert.alert("Success", result.message);
        // Optionally navigate or clear form
        navigation.navigate("HomeScreen", {
          name,
          location,
          breed,
          contact,
          date: selectedDate,
          time: formattedTime,
        });
        clearForm();
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error("Error submitting details:", error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  const clearForm = () => {
    setName("");
    setLocation("");
    setBreed("");
    setContact("");
    setSelectedDate("");
    setSelectedTime(new Date());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fill your details to send request to the trainer</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#666"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Breed"
          placeholderTextColor="#666"
          value={breed}
          onChangeText={setBreed}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact"
          placeholderTextColor="#666"
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
        />

        {/* Date Picker */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{selectedDate || "Select Date"}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{ [selectedDate]: { selected: true } }}
          />
        )}

        {/* Time Picker */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTimePicker(true)}
        >
          <Text>
            {selectedTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) || "Select Time"}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleTimeChange}
          />
        )}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Userdetailsfortrainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E6B8",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#EFEFEF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
  },
  nextButton: {
    backgroundColor: "#6A5ACD",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
