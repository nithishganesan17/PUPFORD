import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BookTrainer = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch trainers from PHP backend on component mount
    useEffect(() => {
        fetchApprovedTrainers();
    }, []);

    const fetchApprovedTrainers = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://192.168.196.174/myapp/trainerslist.php');
            const json = await response.json();

            if (json.success) {
                // You can add `id` for FlatList keys if needed. Here we assume name is unique.
                const trainerList = json.data.map((trainer, index) => ({
                    id: `${index}`,  // If no ID, use index as fallback
                    name: trainer.name,
                    location: trainer.location,
                    specialization: trainer.specialization,
                    salary: trainer.salary, // Already formatted in PHP
                    phone: 'N/A', // If no phone from backend, show placeholder
                    image: { uri: trainer.profile_photo || 'https://via.placeholder.com/50' }
                }));
                setTrainers(trainerList);
            } else {
                Alert.alert('No trainers found', json.message);
            }
        } catch (error) {
            console.error('Error fetching trainers:', error);
            Alert.alert('Error', 'Failed to fetch trainers');
        }
        setLoading(false);
    };

    // Filter trainers based on search input
    const filteredTrainers = trainers.filter(trainer =>
        trainer.name.toLowerCase().includes(search.toLowerCase()) ||
        trainer.specialization.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>ALLOTE TRAINER</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Icon name="search" size={18} color="gray" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search trainer or specialization"
                    placeholderTextColor="gray"
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />
            </View>

            {/* Loading Spinner */}
            {loading ? (
                <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={filteredTrainers}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>No trainers available</Text>}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={item.image} style={styles.image} />

                            <View style={styles.info}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.text}>Location: {item.location}</Text>
                                <Text style={styles.text}>Specialization: {item.specialization}</Text>
                                <Text style={styles.text}>Salary: {item.salary}</Text>
                            </View>

                            <TouchableOpacity style={styles.selectButton} onPress={() => navigation.navigate('Trainerrating')}>
                                <Text style={styles.selectText}>SELECT</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8E5AB',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E7EB',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        color: 'black',
    },
    card: {
        backgroundColor: '#D1D5DB',
        padding: 16,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: '#ccc',
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    text: {
        color: '#374151',
        fontSize: 14,
    },
    price: {
        fontWeight: 'bold',
        color: 'black',
    },
    selectButton: {
        backgroundColor: '#3B82F6',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    selectText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default BookTrainer;
