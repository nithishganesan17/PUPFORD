import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';

const GermanTraining2 = ({ navigation }) => {
    const scrollViewRef = useRef(null);

    return (
        <View style={styles.container}>
            <ScrollView ref={scrollViewRef} style={styles.scrollView}>
                {/* Back and Home Buttons */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('GermanTrainingScreen')}>
                        <Icon name="arrow-left" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                        <Icon name="home" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Title */}
                <Text style={styles.title}>GERMAN SHEPHERD 2</Text>

                {/* Commands Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Commands:</Text>
                    <View style={styles.card}>
                        <Text style={styles.text}>1. Choose a Command (e.g., "Sit").</Text>
                        <Text style={styles.text}>2. Hold a treat close to your dog’s nose and move it upward so their bottom naturally lowers.</Text>
                        <Text style={styles.text}>3. Once they sit, say the command ("Sit") and give the treat.</Text>
                        <Text style={styles.text}>4. Repeat 5–10 times daily in short sessions.</Text>
                    </View>
                </View>

                {/* Leash Training Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Leash Training:</Text>
                    <View style={styles.card}>
                        <Text style={styles.text}>1. Start in a calm area with a short leash.</Text>
                        <Text style={styles.text}>2. Use the command "Heel" and reward them until they remain at your side.</Text>
                        <Text style={styles.text}>3. If they pull, stop walking immediately and wait until they return to your side.</Text>
                        <Text style={styles.text}>4. Resume walking and reward good behavior.</Text>
                    </View>
                </View>

                {/* Socialization Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Socialization:</Text>
                    <View style={styles.card}>
                        <Text style={styles.text}>1. Introduce your dog to new people and pets gradually.</Text>
                        <Text style={styles.text}>2. Visit dog-friendly places like parks or pet stores.</Text>
                        <Text style={styles.text}>3. Reward calm behavior when meeting strangers or other animals.</Text>
                        <Text style={styles.text}>4. Keep experiences positive and never force.</Text>
                    </View>
                </View>

                 {/* Video Section */}
      <Text style={styles.sectionTitle}>Video:</Text>
      <View style={styles.videoContainer}>
        <Video
          source={require('./assets/german.mp4')} // <-- Local video with require()
          style={styles.video}
          controls={true}
          resizeMode="contain"
        />
      </View>

                {/* Trainer Button */}
                <Text style={styles.textCenter}>If not convinced, allote a trainer to train your dog</Text>
                <TouchableOpacity style={styles.trainerButton} onPress={() => navigation.navigate('BookTrainer')}>
                    <Text style={styles.trainerButtonText}>ALLOTE TRAINER</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCE6B1',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    card: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
    },
    textCenter: {
        textAlign: 'center',
        fontSize: 14,
        marginVertical: 10,
    },
    videoContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    video: {
        width: '100%',
        height: 150,
    },
    trainerButton: {
        backgroundColor: '#000',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 15,
    },
    trainerButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default GermanTraining2;
