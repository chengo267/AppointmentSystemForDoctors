import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LogginScreen from './src/screens/LogginScreen';
import SignupDocScreen from './src/screens/SignupDocScreen';
import SignupPatScreen from './src/screens/SignupPatScreen';
import DoctorsScreen from './src/screens/DoctorsScreen';
import PatientsScreen from './src/screens/PatientsScreen';
import AppointmentScreen from './src/screens/AppointmentScreen';
import * as firebase from 'firebase';
import "firebase/firestore";

// import {decode, encode} from 'base-64';
// if (!global.btoa) {  global.btoa = encode }
// if (!global.atob) { global.atob = decode }


const firebaseConfig = {
  apiKey: "AIzaSyCj0WmaNKzKy4j3SXXuJDz2cjVWvKFu9aA",
  authDomain: "appointmentsystemfordoctors.firebaseapp.com",
  databaseURL: "https://appointmentsystemfordoctors-default-rtdb.firebaseio.com",
  projectId: "appointmentsystemfordoctors",
  storageBucket: "appointmentsystemfordoctors.appspot.com",
  messagingSenderId: "735429098221",
  appId: "1:735429098221:web:b709872817a03e8e3beae4",
};

firebase.initializeApp(firebaseConfig);

const navigator = createStackNavigator(
  {
    Loggin: LogginScreen,
    SignupDoc: SignupDocScreen,
    SignupPat: SignupPatScreen,
    Doctors: DoctorsScreen,
    Patients:PatientsScreen,
    Appointment: AppointmentScreen
  },
  {
    initialRouteName: "Loggin",
    defaultNavigationOptions: {
      title: "App",
      headerTitle:"​Appointment system for doctors",
      headerLeft: ()=>false
    },
  }
);

export default createAppContainer(navigator);