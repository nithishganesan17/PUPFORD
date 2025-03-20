import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen';
import DogProfile from './screens/DogProfile';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ForgetPass from './screens/ForgetPass'
import HomeScreen from './screens/HomeScreen'
import Homemenu from './screens/Homemenu'
import Aboutus from './screens/Aboutus'
import TrainerLogin from './screens/TrainerLogin'
import TrainerSignup from './screens/TrainerSignup'
import AdminLogin from './screens/AdminLogin'
import Changepass from './screens/Changepass'
import Newpasslogin from './screens/Newpasslogin'
import Logout from './screens/Logout'
import Trainerhomescreen from './screens/Trainerhomescreen'
import Editprofile from './screens/Editprofile'
import LabradorTrainingScreen from './screens/LabradorTrainingScreen'
import GermanTrainingScreen from './screens/GermanTrainingScreen.js'
import HuskeyTrainingScreen from './screens/HuskeyTrainingScreen.js'
import GoldenTrainingScreen from './screens/GoldenTrainingScreen.js'
import BeagleTrainingScreen from './screens/BeagleTrainingScreen.js'
import GermanTraining2 from './screens/GermanTraining2.js'
import LabradorTraining2 from './screens/LabradorTraining2.js'
import HuskeyTraining2 from './screens/HuskeyTraining2.js'
import GoldenTraining2 from './screens/GoldenTraining2.js'
import BeagleTraining2 from './screens/BeagleTraining2.js'
import TrainerApplication from './screens/TrainerApplication.js';
import AdminDashboard from './screens/AdminDashboard.js';
import AdminTrainerRequest from './screens/AdminTrainerRequest.js';
import ApplicationStatusScreen from './screens/ApplicationStatusScreen.js';
import AdminTrainersList from './screens/AdminTrainersList.js';
import AdminTrainersprofile from './screens/AdminTrainersprofile.js';
import AdminExplore from './screens/AdminExplore.js';
import Trainerstatus from './screens/Trainerstatus.js';
import BookTrainer from './screens/BookTrainer.js';
import Userdetailsfortrainer from './screens/Userdetailsfortrainer.js';
import Trainerrating from './screens/Trainerrating.js';
import Usertrainerrequest from './screens/Usertrainerrequest.js';
import Yourtrainer from './screens/Yourtrainer.js';
import Myclient from './screens/Myclient.js';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen 
          name="SplashScreen" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="DogProfile" 
          component={DogProfile} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ForgetPass" 
          component={ForgetPass} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Homemenu" 
          component={Homemenu} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AdminExplore" 
          component={AdminExplore} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="Trainersstatus" 
          component={Trainerstatus} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Aboutus" 
          component={Aboutus} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="TrainerLogin" 
          component={TrainerLogin} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="TrainerSignup" 
          component={TrainerSignup} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AdminLogin" 
          component={AdminLogin} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Changepass" 
          component={Changepass} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Newpasslogin" 
          component={Newpasslogin} 
          options={{ headerShown: false }} 
        />
       
        <Stack.Screen 
          name="Logout" 
          component={Logout} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="Trainerhomescreen" 
          component={Trainerhomescreen} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="Editprofile" 
          component={Editprofile} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="LabradorTrainingScreen" 
          component={LabradorTrainingScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="GermanTrainingScreen" 
          component={GermanTrainingScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="HuskeyTrainingScreen" 
          component={HuskeyTrainingScreen} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="GoldenTrainingScreen" 
          component={GoldenTrainingScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="BeagleTrainingScreen" 
          component={BeagleTrainingScreen} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="GermanTraining2" 
          component={GermanTraining2} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="LabradorTraining2" 
          component={LabradorTraining2} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="HuskeyTraining2" 
          component={HuskeyTraining2} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="GoldenTraining2" 
          component={GoldenTraining2} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="BeagleTraining2" 
          component={BeagleTraining2} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="TrainerApplication" 
          component={TrainerApplication} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="AdminDashboard" 
          component={AdminDashboard} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AdminTrainerRequest" 
          component={AdminTrainerRequest} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ApplicationStatusScreen" 
          component={ApplicationStatusScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AdminTrainersList" 
          component={AdminTrainersList} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AdminTrainersprofile" 
          component={AdminTrainersprofile} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="BookTrainer" 
          component={BookTrainer} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="Userdetailsfortrainer" 
          component={Userdetailsfortrainer} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="Trainerrating" 
          component={Trainerrating} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="Usertrainerrequest" 
          component={Usertrainerrequest} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Yourtrainer" 
          component={Yourtrainer} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Myclient" 
          component={Myclient} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

