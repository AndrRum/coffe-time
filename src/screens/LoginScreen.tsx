import React, {useState} from 'react'
import {TextInput, View, Button, TouchableOpacity, Text, StyleSheet} from 'react-native'


export const LoginScreen = (props: any) => {

    const navigation = props.navigation

    const [text, setText] = useState<string>('')

    const textChangeHandler = (text: string) => {
        setText(text)
    }

    const buttonInputHandler = () => {
        navigation.navigate('PasswordScreen')
    }


    const textButtonHandler = () => {
        navigation.navigate('RegistrationScreen')
    }

    return (
        <View>
            <TextInput
                onChangeText = {textChangeHandler}
                value = {text}
                placeholder = 'Введите логин'
            />
            <Button
                title = 'Подтвердить'
                onPress = {buttonInputHandler}
            />
            <Button 
                title={'Регистрация'}
                onPress={textButtonHandler}
                color='darkred'
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container: {

    },
    text: {

    },
    textButton: {
        
    },
})