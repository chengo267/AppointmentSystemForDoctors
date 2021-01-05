
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {isFullName, isId} from '../InputValidation';
import TextInp from '../components/TextInp';
import FlatButton from '../components/FlatButton';
import * as firebase from 'firebase';
import "firebase/firestore";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

const SignupPatScreen = props =>{

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  const refPatients = firebase.firestore().collection('Patients');

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setToken(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    };

    _handleNotification = notification => {
      console.log(notification);
    };
  
    _handleNotificationResponse = response => {
      console.log(response);
    };

  useEffect(()=>{
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener(_handleNotification);
    Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);
  }, []);



  const newPatient = () => {
    if(isFullName(name) && isId(id)){
      var newPat={
        name: name,
        id: id,
        email: props.navigation.getParam('email'),
        password: props.navigation.getParam('password'),
        isInLine: false,
        token: token};
  
        var userDBid= props.navigation.getParam('userObjId')
        refPatients.doc(userDBid).set(newPat);
        props.navigation.navigate('Patients');
    }
    else{
      Alert.alert('Error', 'Some details are not well filled');
    }
  }

    return(
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Sign Up For Patients:</Text>
          <TextInp text={'Full Name'}
                  val={name}
                  on_change_taxt={newName=> {setName(newName)}}/>
          <TextInp text={'id'}
                  val={id}
                  on_change_taxt={newId=> {setId(newId)}}/>
          <FlatButton text='SignUp' on_Press={newPatient}></FlatButton>
          <Image style={styles.imageStyle} source={require('../../assets/doctor.png')}/>
        </View>
      );

}

const styles = StyleSheet.create({
  viewStyle:{
      flex: 1,
      backgroundColor: '#87cefa'
  },
  titleStyle:{
    fontWeight: 'bold',
    textAlign:'center',
    fontSize:30,
    marginTop:60,
    marginBottom:60
  },
  imageStyle:{
    width: 300,
    height: 300,
    left:120, 
    marginTop:50
},
})

export default SignupPatScreen;
