
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import FlatButton from '../components/FlatButton';
import Checkbox from '../components/Checkbox';
import * as firebase from 'firebase';
import "firebase/firestore";

const DoctorsScreen = () =>{

    const [patName, setPatName] = useState('');
    const [DocName, setDocName] = useState('');
    const [isActive, setIsActive]=useState(false);
    const [ waitingList, setWaitingList ] = useState([]);
    const logedInUserDBId = firebase.auth().currentUser.uid;
    const refDoctors = firebase.firestore().collection('Doctors');
    const refWaitingList = firebase.firestore().collection('WaitingList');
    refDoctors.doc(logedInUserDBId).get().then(doc=> {const {name, active} = doc.data();
                                                           setDocName(name); setIsActive(active)}).catch(error=> console.log('Get Data Error'));;
    
    useEffect(()=>{
        refWaitingList.onSnapshot(querySnapshot =>{
            const list = [];
            querySnapshot.forEach(doc =>{
                const {doctorId}=doc.data();
                if(doctorId==logedInUserDBId){
                    const {patientName, time,}=doc.data();
                    list.push({name: patientName, time: time, patId: doc.id});
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
    
    const getNext = ()=>{

    }

    return(
        <View style={styles.viewStyle}>
            <Text style={styles.titleStyle}>Hi Dr {DocName}!</Text>
            <Checkbox text="Check to be available in the doctors's list"
                    val={isActive}
                    on_val_change={newVal=> {setIsActive(newVal)
                                    refDoctors.doc(logedInUserDBId).update({"active":newVal})}}
          ></Checkbox>
           <View style={styles.viewListStyle}>
                <FlatList 
                    data={waitingList}
                    renderItem={({ item }) => (
                        <ListItem chevron>
                            <Avatar source={require('../../assets/patient.png')} size={70} />
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                                <ListItem.Subtitle>{item.patId}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>)}
                    keyExtractor={item => item.id}
                    scrollEnabled/>
            </View>
            <FlatButton text='Get Next' on_Press={getNext}></FlatButton>
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
    switchStyle:{
        flexDirection:'row',
        alignSelf:'center'
    }
  })
export default DoctorsScreen;
