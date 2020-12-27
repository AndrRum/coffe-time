import React, {useState} from 'react'
import {Text, Button, View, TextInput, Alert, StyleSheet } from 'react-native'
import { execRequest } from '../api/ExecuteRequest'
import { createRegisterConfig } from '../api/AuthUser'
import {useDispatch, useSelector} from 'react-redux'
import {deleteText} from '../redux/actionCreators'



export const RegistrationScreen = (props: any) => {

    const navigation = props.navigation

    const dispatch = useDispatch();

    const [logText,setLogText] = useState ('')

    const [pasText,setPasText] = useState ('')

    const [secondPasText, setRepitePasText] = useState ('')

    const [ regText, setRegText ] = useState("Регистрация")


    const textHandlers = {

        changeLoginHandler: (text:string) => {setLogText(text.trim())},

        changePasswordHandler: (text:string) => {setPasText(text.trim())},

        changeRepitePasswordHandler: (text:string) => {setRepitePasText(text.trim())} ,
    }

    const isValid = pasText===secondPasText&&pasText!==''&&logText!==''

    const handleButtonPress = () => {
        
        if (isValid) {

            const success = (result: any) => { setRegText(JSON.stringify(result)) };
        
            const failure = (reason: any) => { setRegText(JSON.stringify(reason)) };

            execRequest(createRegisterConfig({
                email: logText,
                password: pasText,
            })).then(success).catch(failure)

            navigation.navigate('HomeScreen')

            setLogText('')

            setPasText('')

            setRepitePasText('')
            
        }
        else {

            Alert.alert ('Oh no')

            setPasText('')

            setRepitePasText('')

        }
        
    }



    return (
        <View>
            <Text style={styles.text}>{regText}</Text>
                <TextInput
                    placeholder = 'Введите логин'
                    onChangeText = {textHandlers.changeLoginHandler}
                    value = {logText}
                />
                <TextInput
                    placeholder = 'Введите пароль'
                    onChangeText = {textHandlers.changePasswordHandler}
                    value = {pasText}
                    secureTextEntry
                />
                <TextInput
                    placeholder = 'Повторите пароль'
                    onChangeText = {textHandlers.changeRepitePasswordHandler}
                    value = {secondPasText}
                    secureTextEntry
                />
                <Text>{}</Text>
                <Button
                    title = 'Подтвердить'
                    onPress = {handleButtonPress}
                />
        </View>
    )
}

const styles=StyleSheet.create({
    text: {
        
    }
})