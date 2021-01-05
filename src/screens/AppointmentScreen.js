import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList,Alert} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import FlatButton from '../components/FlatButton';
import * as firebase from 'firebase';
import "firebase/firestore";

const AppointmentScreen = props =>{

    const logedInUserDBId = firebase.auth().currentUser.uid;
    const refPatients = firebase.firestore().collection('Patients');
    const refWaitingList = firebase.firestore().collection('WaitingList');
    const refDoctors = firebase.firestore().collection('Doctors');
    const [id, setId] = useState('');
    refPatients.doc(logedInUserDBId).get().then(doc=> {const {id} = doc.data();
                                                setId(id)}).catch(error=> console.log('Get Data Error'));;

    const patName = props.navigation.getParam('patientName');
    const docName = props.navigation.getParam('doctorName');
    const docId = props.navigation.getParam('doctorId');
    const [ waitingList, setWaitingList ] = useState([]);

    useEffect(()=>{
        refWaitingList.onSnapshot(querySnapshot =>{
            const list = [];
            querySnapshot.forEach(doc =>{
                const {doctorId}=doc.data();
                if(doctorId==docId){
                    const {patientName, time, patientDBid}=doc.data();
                    list.push({name: patientName, time: time, patientDBid:patientDBid});
                }
            });

            //sort by arrival time
            list.sort((a,b)=>{
                var dateA = new Date(a.time);
                var dateB = new Date(b.time);
                return dateA - dateB;});
            
            setWaitingList(list);
        });
    }, []);

    const cancelAppointment = () =>{
        if(waitingList[0].patientDBid=!logedInUserDBId){
            refWaitingList.doc(id).delete();
            refPatients.doc(logedInUserDBId).update({"isInLine":false});
            refDoctors.doc(docId).update({"waitingCounter": firebase.firestore.FieldValue.increment(-1)});
            props.navigation.navigate('Patients');
        }
        else{
            Alert.alert('Error', "you can't cancel");
        }
    }

    return(
        <View style={styles.viewStyle}>
            <Text style={styles.titleStyle} marginTop={20}>Dear {patName},</Text>
            <Text style={styles.titleStyle}>you have an appointment with</Text>
            <Text style={styles.titleStyle}>Dr {docName}.</Text>
            <Text style={styles.subtitleStyle}>Waiting List:</Text>
            <View style={styles.viewListStyle}>
                <FlatList 
                    data={waitingList}
                    renderItem={({ item }) => (
                        <ListItem chevron>
                            <Avatar source={require('../../assets/patient.png')} size={70} />
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                                <ListItem.Subtitle>{item.time}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>)}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled/>
            </View>
            <Text style={styles.cancelDesStyle}>You have the option to cancel your appointment as long as you have not yet received a notification that your appointment has arrived, and the doctor is waiting for you</Text>
            <FlatButton text='Cancel' on_Press={cancelAppointment}></FlatButton>
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
        fontSize:20,
    },
    subtitleStyle:{
        textAlign:'center',
        fontSize:18,
        marginTop:20
    },
    viewListStyle:{
        width:300, 
        alignSelf:'center',
        margin:25     
    },
    cancelDesStyle:{
        textAlign:'center',
        fontSize:15,
    },
    
})
export default AppointmentScreen;
