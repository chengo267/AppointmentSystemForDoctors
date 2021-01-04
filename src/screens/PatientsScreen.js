
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Checkbox from '../components/Checkbox';
import * as firebase from 'firebase';
import "firebase/firestore";

const PatientsScreen = props =>{

    const logedInUserDBId = firebase.auth().currentUser.uid;
    const [name, setPatName] = useState('');
    const [id, setId] = useState('');
    const [isSort, setIsSort] = useState(false);
    const [isInLine, setIsInLine] = useState(false);
    const refPatients = firebase.firestore().collection('Patients');
    const refDoctors = firebase.firestore().collection('Doctors');
    refPatients.doc(logedInUserDBId).get().then(doc=> {const {name, isInLine, id} = doc.data();
                                                           setPatName(name); setIsInLine(isInLine); setId(id)}).catch(error=> console.log('Get Data Error'));;
    
    const [ doctorsList, setDoctorsList ] = useState([]);

    useEffect(()=>{
        refDoctors.onSnapshot(querySnapshot =>{
            const list = [];
            querySnapshot.forEach(doc =>{
                const {active}=doc.data();
                if(active){
                    const {name, specialization, waitingCounter}=doc.data();
                    list.push({id: doc.id, name: name, specialization: specialization, waitingCounter: waitingCounter});
                }
            });

            //sort by availability
            if(isSort){
                list.sort((a,b)=>{return a.waitingCounter-b.waitingCounter});
            }
            setDoctorsList(list);
        });

        
    }, [isSort]);

    const makeAnAppointment =(item)=>{
        if(isInLine){
            Alert.alert('Error', 'You are already in the line');
        }
        else{
            setIsInLine(true);
            refPatients.doc(logedInUserDBId).update({"isInLine":isInLine});
            refDoctors.doc(item.id).update({"waitingCounter": firebase.firestore.FieldValue.increment(1)});
            var newWaiting={time: new Date().toLocaleString(),
                doctorId: item.id,
                doctorName: item.name,
                patientName: name}

            firebase.firestore().collection('WaitingList').doc(id).set(newWaiting);
            props.navigation.navigate('Appointment', newWaiting);
        }
    }

    return(
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>Hi {name}!</Text>
          <Text style={styles.subtitleStyle}>Choose a doctor to make an appointment:</Text>
          <Checkbox text='Check to sort by availability'
                    val={isSort}
                    on_val_change={newVal=> {setIsSort(newVal)}}
          ></Checkbox>

          <View style={styles.viewListStyle}>
                <FlatList 
                    data={doctorsList}
                    renderItem={({ item }) => (
                        <ListItem
                            chevron    
                            onPress={() => {makeAnAppointment(item)}}>
                            <Avatar source={require('../../assets/doc.png')} size={70} />
                            <ListItem.Content>
                                <ListItem.Title>Dr {item.name}</ListItem.Title>
                                <ListItem.Subtitle>{item.specialization}</ListItem.Subtitle>
                                <ListItem.Subtitle>Waiting: {item.waitingCounter.toString()}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>)}
                    keyExtractor={item => item.id}
                    scrollEnabled/>
            </View>
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
      marginBottom:20
    },
    subtitleStyle:{
        textAlign:'center',
        fontSize:18,
    },
    viewListStyle:{
        width:300, 
        alignSelf:'center',
        margin:25     
    },
  })

export default PatientsScreen;
