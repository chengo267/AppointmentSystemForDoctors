
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {isFullName, isId} from '../InputValidation';
import TextInp from '../components/TextInp';
import FlatButton from '../components/FlatButton';
import * as firebase from 'firebase';
import "firebase/firestore";

const SignupPatScreen = props =>{

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const refPatients = firebase.firestore().collection('Patients');

  const newPatient = () => {
    if(isFullName(name) && isId(id)){
      var newPat={
        name: name,
        id: id,
        email: props.navigation.getParam('email'),
        password: props.navigation.getParam('password'),
        isInLine: false};
  
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
