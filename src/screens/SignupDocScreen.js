
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import TextInp from '../components/TextInp';
import FlatButton from '../components/FlatButton';
import {isFullName} from '../InputValidation';
import * as firebase from 'firebase';
import "firebase/firestore";

const SignupDocScreen = props =>{

  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const refDoctors = firebase.firestore().collection('Doctors');

  const newDoctor = () => {
    if(isFullName(name) && (specialization!=null)){
      var newDocror={
        name: name,
        specialization: specialization,
        email: props.navigation.getParam('email'),
        password: props.navigation.getParam('password'),
        active: false,
        waitingCounter:0};
  
        var userDBid= props.navigation.getParam('userObjId')
        refDoctors.doc(userDBid).set(newDocror);
        props.navigation.navigate('Doctors');
    }
    else{
      Alert.alert('Error', 'Some details are not well filled');
    }
  }

    return(
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Sign Up For Doctors:</Text>
          <TextInp text={'Full Name'}
                  val={name}
                  on_change_taxt={newName=> {setName(newName)}}/>
          <TextInp text={'Specialization'}
                  val={specialization}
                  on_change_taxt={newspec=> {setSpecialization(newspec)}}/>
          <FlatButton text='SignUp' on_Press={newDoctor}></FlatButton>
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
export default SignupDocScreen;
