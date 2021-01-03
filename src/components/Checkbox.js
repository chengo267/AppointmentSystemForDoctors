import React, {useState} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function Checkbox({text, val, on_val_change}) {

    return (
        <View flexDirection='row' alignSelf='center'>
            <CheckBox style={styles.checkboxStyle}
                      value={val}
                      onValueChange={on_val_change} />
            <Text style={styles.checkboxTextStyle} > {text} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxStyle:{
        alignSelf:'flex-end'
    },
    checkboxTextStyle:{
        fontSize:15,
        textAlign:'right',
        marginTop:5
    }
})