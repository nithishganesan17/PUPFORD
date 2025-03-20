//this is for my demo


import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Trainerstatus = () => {
  const navigation = useNavigation();
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTrainers, setFilteredTrainers] = useState([]);

  useEffect(() => {
    fetchApprovedTrainers();
  }, []);

  const fetchApprovedTrainers = async () => {
    try {
      const response = await fetch("https://your-api.com/getApprovedTrainers"); // Replace with actual API endpoint
      const data = await response.json();
      setTrainers(data.trainers || []);
      setFilteredTrainers(data.trainers || []);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = trainers.filter((trainer) =>
      trainer.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTrainers(filtered);
  };

  const renderTrainer = ({ item }) => (
    <View style={styles.trainerCard}>
      <Image source={{ uri: item.profile_photo }} style={styles.profileImage} />
      <View style={styles.trainerInfo}>
        <Text style={styles.trainerName}>{item.name}</Text>
        <Text style={styles.trainerLocation}>📍 {item.location}</Text>
        <Text style={styles.trainerPhone}>📞 {item.phone}</Text>
        <Text style={styles.trainerSalary}>💰 {item.salary}/PER MONTH</Text>
      </View>
      <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate("AdminTrainersprofile", { trainer: item })}>
        <Text style={styles.viewText}>VIEW</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack("Trainerhomescreen")} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>TRAINERS</Text>

      {trainers.length === 0 ? (
        <Text style={styles.noTrainersText}>NO clients were appointed for you wait some time</Text>
      ) : (
        <>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="E.g: German Shepherd"
              value={search}
              onChangeText={handleSearch}
            />
          </View>

          <FlatList
            data={filteredTrainers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTrainer}
          />
        </>
      )}
    </View>
  );
};

export default Trainerstatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E6B8",
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 10,
    padding: 10,
  },
  backText: {
    fontSize: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  noTrainersText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5D5C5",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "black",
  },
  trainerCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  trainerInfo: {
    flex: 1,
  },
  trainerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  trainerLocation: {
    fontSize: 14,
    color: "#555",
  },
  trainerPhone: {
    fontSize: 14,
    color: "#555",
  },
  trainerSalary: {
    fontSize: 14,
    fontWeight: "bold",
  },
  viewButton: {
    backgroundColor: "#6A5ACD",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  viewText: {
    color: "white",
    fontWeight: "bold",
  },
});