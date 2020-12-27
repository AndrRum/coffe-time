import React, {useState} from 'react'
import {View, TextInput, Button} from 'react-native'

export const PasswordScreen = (props: any) => {

    const navigation = props.navigation 

    const [content, setContent] = useState ('')

    const contentChangeHandler = (text: string) => { 
        setContent(text)
    }
    const buttonInputHandler = () => {
        navigation.navigate('HomeScreen')
    }
    return (
        <View>
            <TextInput
                onChangeText = {contentChangeHandler}
                value = {content}
                placeholder = 'Введите пароль'
            />
            <Button
                title = 'Подтвердить'
                onPress = {buttonInputHandler}
            />
        </View>
    )
}