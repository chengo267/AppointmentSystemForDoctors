import React from 'react';
import { StyleSheet, View, TextInput} from 'react-native';

export default function TextInp({text, on_change_taxt, val, secureText, KeyBoard}) {
    return (
        <View>
            <TextInput 
                style={styles.inputStyle}
                placeholder= {text}
                autoCorrect={false}
                secureTextEntry={secureText}
                placeholderTextColor='#808080'
                keyboardType={KeyBoard}
                onChangeText={on_change_taxt}
                value={val}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle:{
        borderWidth: 1,
        borderColor: '#808080',
        backgroundColor: '#dcdcdc',
        padding: 8,
        margin:10,
        width:180,
        alignSelf:'center',
    }
})