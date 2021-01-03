
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import TextInp from '../components/TextInp';
import Checkbox from '../components/Checkbox';
import FlatButton from '../components/FlatButton';
import {isValidMail, isValidPassword} from '../InputValidation';
import * as firebase from 'firebase';
import "firebase/firestore";


const LogginScreen = props =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDoc, setIsDoc] = useState(false);
  const [isPat, setIsPat] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    if(userObj){
        if(userObj.additionalUserInfo.isNewUser==true){
            if(isDoc){
                const docDetails={userObjId: userObj.user.uid,
                                  email: email,
                                  password: password}
                props.navigation.navigate('SignupDoc', docDetails);
            }
            else{
                const patDetails={userObjId: userObj.user.uid,
                                  email: email,
                                  password: password}
                props.navigation.navigate('SignupPat', patDetails);
            }
        }
        else{
            if(isDoc){

            }
            else{

            }
        }
    }
  }, [userObj]);

  const makeLoggin =()=>{
      if(isValidMail(email) && isValidPassword(password) && (isPat || isDoc)){
        firebase.auth().createUserWithEmailAndPassword(email, password).
            then((result)=>{ setUserObj(result)}).catch(error=> console.log(error));
      }
      else{
        Alert.alert('Error', 'Some details are not well filled');
      }
  }

    return(
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>BOOK A DOCTOR</Text>
          <Text style={styles.descriptionStyle}>BOOK A DOCTOR is an application to make</Text>
          <Text style={styles.descriptionStyle}>an appointment with any doctor you want.</Text>
          <View marginTop={20}>
            <TextInp text={'Email'}
                        val={email}
                        on_change_taxt={newMail=> {setEmail(newMail)}}
                        KeyBoard='email-address'
                        />
            <TextInp text={'Password'}
                        val={password}
                        on_change_taxt={newPassword=> {setPassword(newPassword)}}
                        secureTextEntry='true'
                        />
            </View>
          <Checkbox text='I am a doctor'
                    val={isDoc}
                    on_val_change={newVal=> {setIsDoc(newVal); setIsPat(!newVal)}}
          ></Checkbox>
          <Checkbox text='I am a patient'
                    val={isPat}
                    on_val_change={newVal=> {setIsPat(newVal); setIsDoc(!newVal)}}
          ></Checkbox>
          <FlatButton text='Loggin' on_Press={makeLoggin}></FlatButton>
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
        fontSize:40,
        marginTop:60
    },
    descriptionStyle:{
        textAlign:'center',
        marginTop:10,
    },
    imageStyle:{
        width: 300,
        height: 300,
        left:120
    },
    checkBoxStyle:{
        marginLeft:100
    }
})
export default LogginScreen;
