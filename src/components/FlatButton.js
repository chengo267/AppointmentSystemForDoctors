import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default function FlatButton({ text, on_Press}) {
    return (
        <View alignSelf={'center'}>
            <TouchableOpacity onPress={on_Press}>
                <View style={styles.buttonStyle} >
                    <Text style={styles.buttonText}>{text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    buttonStyle:{
        borderRadius: 30,
        paddingVertical: 12, 
        paddingHorizontal: 30,
        width:170,
        alignSelf:'center',
        backgroundColor:'#4169e1',
        margin:10
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22, 
        textAlign: 'center'
    }
})