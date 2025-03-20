import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';

const LabradorTrainingScreen = ({ navigation }) => {
    const scrollViewRef = useRef(null);

    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };

    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    return (
        <View style={styles.container}>
            <ScrollView ref={scrollViewRef} style={styles.scrollView}>
                {/* Back and Home Buttons */}
                <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
    <Icon name="arrow-left" size={24} color="black" />
</TouchableOpacity>
                </View>

                {/* Title */}
                <Text style={styles.title}>LABRADOR</Text>

                {/* Commands Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Commands:</Text>
                    <View style={styles.card}>
                        <Text style={styles.text}>1. Choose a Command (e.g., "Sit").</Text>
                        <Text style={styles.text}>2. Hold a treat close to your dog’s nose and move it upward so their bottom lowers.</Text>
                        <Text style={styles.text}>3. Once they sit, say "Sit" and give the treat.</Text>
                        <Text style={styles.text}>4. Repeat 5–10 times daily in short sessions.</Text>
                    </View>
                </View>

                {/* Leash Training Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Leash Training:</Text>
                    <View style={styles.card}>
                        <Text style={styles.text}>1. Start in a calm area with a short leash.</Text>
                        <Text style={styles.text}>2. Use the command "Heel" and reward them when they stay beside you.</Text>
                        <Text style={styles.text}>3. If they pull, stop walking immediately and wait.</Text>
                        <Text style={styles.text}>4. Resume walking and reward good behavior.</Text>
                    </View>
                </View>

                {/* Socialization Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Socialization:</Text>
                    <View style={styles.card}>
                        <Text style={styles.text}>1. Introduce your dog to new people and pets gradually.</Text>
                        <Text style={styles.text}>2. Visit dog-friendly places like parks or pet stores.</Text>
                        <Text style={styles.text}>3. Reward calm behavior when meeting strangers.</Text>
                        <Text style={styles.text}>4. Keep experiences positive and never force.</Text>
                    </View>
                </View>

                {/* Video Section */}
                <Text style={styles.sectionTitle}>Video:</Text>
                <View style={styles.videoContainer}>
                    <Video
                        source={{ uri: 'https://www.example.com/dog-training.mp4' }} // Replace with actual video URL
                        style={styles.video}
                        controls={true}
                    />
                </View>

                {/* Next Button */}
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('LabradorTraining2')}>
                    <Text style={styles.nextButtonText}>NEXT</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Scroll Up & Down Buttons */}
            <View style={styles.scrollButtons}>
                <TouchableOpacity style={styles.scrollButton} onPress={scrollToTop}>
                    <Icon name="chevron-up" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.scrollButton} onPress={scrollToBottom}>
                    <Icon name="chevron-down" size={24} color="white" />
                </TouchableOpacity>
            </View>
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
    videoContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    video: {
        width: '100%',
        height: 150,
    },
    nextButton: {
        backgroundColor: '#000',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 15,
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollButtons: {
        position: 'absolute',
        right: 20,
        bottom: 50,
        flexDirection: 'column',
    },
    scrollButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 50,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LabradorTrainingScreen;
