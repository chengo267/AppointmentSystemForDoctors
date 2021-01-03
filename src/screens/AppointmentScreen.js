
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const AppointmentScreen = props =>{

    const logedInUserDBId = firebase.auth().currentUser.uid;
    const refPatients = firebase.firestore().collection('Patients');
    const refWaitingList = firebase.firestore.collection('WaitingList');
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
                    const {patientName, time}=doc.data();
                    list.push({name: patientName, time: time});
                }
            });

            //sort by arrival time
            
            setWaitingList(list);
        });

        
    }, []);

    const cancelAppointment = () =>{
        refWaitingList.doc(id).delete();
        refPatients.doc(logedInUserDBId).update({"isInLine":false});
        refDoctors.doc(docId).update({"waitingCounter": firebase.firestore.FieldValue.decriment(1)});
        props.navigation.navigate('Patients');
    }

    return(
        <View>
            <Text style={styles.titleStyle}>Dear {patName},</Text>
            <Text style={styles.titleStyle}>you have an appointment with Dr {docName}.</Text>
            <Text style={styles.subtitleStyle}>Waiting List:</Text>

            <Text>You can cancel the appointment as long as you have not received the notification that it is your turn</Text>
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
        fontSize:40,
        marginTop:60
    },
})
export default AppointmentScreen;
