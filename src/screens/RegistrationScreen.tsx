import React, {useState} from 'react';
import {Text, Button, View, TextInput, StyleSheet } from 'react-native';
import { execRequest } from '../api/ExecuteRequest';
import { createRegisterConfig } from '../api/AuthUser';
import {useDispatch} from 'react-redux';
import {saveText} from '../redux/actionCreators';



export const RegistrationScreen = (props: any) => {

    const navigation = props.navigation;

    const dispatch = useDispatch();

    const [mailText,setMailText] = useState ("");
    const [pasText,setPasText] = useState ("");
    const [secondPasText, setRepitePasText] = useState ("");


    const [mailErr, setMailErr] = useState("");
    const [pasErr, setPasErr] = useState("");
    const [repitePasErr, setRepitePasErr] = useState("");
    const [serverErr,setServerErr] = useState("");
    const [emptyValueErr,setEmptyValueErr] = useState("");


    const textHandlers = {
        changeLoginHandler: (text:string) => {setMailText(text.trim())},
        changePasswordHandler: (text:string) => {setPasText(text.trim())},
        changeRepitePasswordHandler: (text:string) => {setRepitePasText(text.trim())},
    };

    type typeFields = {
        clearAllTextFields: () => void, 
        clearMailField: () => void,
        clearPasswordField: () => void,
        clearRepitePasswordField: () => void,
        clearPasAndRepitePasField: () => void, 
    };

    const clearTextFieldsHandler: typeFields = {
        clearAllTextFields: () => {setMailText(""), setPasText(""), setRepitePasText("")},
        clearMailField: () => {setMailText("")},
        clearPasswordField: () => {setPasText("")},
        clearRepitePasswordField: () => {setRepitePasText("")},
        clearPasAndRepitePasField: () => {setPasText(""),setRepitePasText("")}
    };

    type typeErrFields = {
        allRight: () => void,
        onlyMailErr: () => void,
        onlyPasErr: () => void,
        onlyRepitePasErr: () => void,
        onlyEmptyValue: () => void,
    };

    const clearErrorsFieldsHandler: typeErrFields = {
        allRight: () => {setMailErr(""), setPasErr(""), setRepitePasErr(""), setServerErr(""), setEmptyValueErr("") },
        onlyMailErr: () => {setPasErr(""), setRepitePasErr(""), setServerErr(""), setEmptyValueErr("")},
        onlyPasErr: () => {setMailErr(""),  setRepitePasErr(""), setServerErr(""), setEmptyValueErr("")},
        onlyRepitePasErr: () => {setMailErr(""), setPasErr(""), setServerErr(""), setEmptyValueErr("")},
        onlyEmptyValue: () => {setMailErr(""), setPasErr(""), setRepitePasErr(""), setServerErr("")},
    };

    const mailString: string = mailText;
    const searchElement = mailString.includes("@");
    const pasLength: number = pasText.length; 
    const maxPassword: boolean = pasLength<=16;
    const minPassword: boolean = pasLength>=5;
    const rightRepitePas: boolean = pasText===secondPasText;
    const notEmptyValue: boolean = mailText!==""&&pasText!=="";

    const validData: boolean = searchElement===true&&notEmptyValue&&maxPassword&&minPassword&&rightRepitePas;

    type typeErrors = {
        emptyValue:boolean, 
        errMail: boolean,
        errPasswordMaxLength: boolean, 
        errPasswordMinLength: boolean, 
        errRightRepitePas: boolean,
    };


    const errorsHandler: typeErrors = {

        emptyValue: mailText===""&&pasText==="",
        errMail: searchElement===false,
        errPasswordMaxLength: pasLength>16,
        errPasswordMinLength: pasLength<5,
        errRightRepitePas: pasText!==secondPasText,
    };

    type typeMessagesError = {

        errMessageEmptyValue: string,
        errMessageMail: string, 
        errMessageMaxPas: string, 
        errMessageMinPas: string,
        errMessageRightRepitePas: string,
        errMessageServer: string,
    };

    const errorsMessage: typeMessagesError = {
        
        errMessageEmptyValue: "Заполните все поля формы",
        errMessageMail: "Некорректный e-mail",
        errMessageMaxPas: "Не более 16 символов",
        errMessageMinPas: "Не менее 5 символов",
        errMessageRightRepitePas: "Пароли не совпадают",
        errMessageServer: "Данные логин и пароль уже использованы"
    };
    

    const onRegisterSuccess = (result: any): void => {
        (JSON.stringify(result));
        navigation.navigate("HomeScreen");
        dispatch(saveText(mailText, pasText));
    };

    const onRegisterFailure = (reason: any): void => {
        (JSON.stringify(reason));
        setServerErr(errorsMessage.errMessageServer);
    };


    const handleButtonPress = (): void => {
    
        if (validData) {
            execRequest(createRegisterConfig({
                email: mailText,
                password: pasText,
            })).then(onRegisterSuccess).catch(onRegisterFailure);
            clearTextFieldsHandler.clearAllTextFields();
            clearErrorsFieldsHandler.allRight();
        }

        if (errorsHandler.errMail) {
            setMailErr (errorsMessage.errMessageMail);
            clearTextFieldsHandler.clearMailField();
            clearErrorsFieldsHandler.onlyMailErr();
        }

        if (errorsHandler.errPasswordMaxLength) {
            setPasErr (errorsMessage.errMessageMaxPas);
            clearTextFieldsHandler.clearPasAndRepitePasField();
            clearErrorsFieldsHandler.onlyPasErr();
        }

        if (errorsHandler.errPasswordMinLength) {
            setPasErr (errorsMessage.errMessageMinPas);
            clearErrorsFieldsHandler.onlyPasErr();
        }

        if (errorsHandler.emptyValue) {
            setEmptyValueErr (errorsMessage.errMessageEmptyValue);
            clearErrorsFieldsHandler.onlyEmptyValue();
        }

        if (errorsHandler.errRightRepitePas) {
            setRepitePasErr(errorsMessage.errMessageRightRepitePas);
            clearTextFieldsHandler.clearPasAndRepitePasField();
            clearErrorsFieldsHandler.onlyRepitePasErr();
        };

    };



    return (
        <View>
                <TextInput
                    placeholder = 'Введите e-mail'
                    onChangeText = {textHandlers.changeLoginHandler}
                    value = {mailText}
                />
                    <Text style={styles.errText}>{mailErr}{emptyValueErr}</Text>
                <TextInput
                    placeholder = 'Введите пароль'
                    onChangeText = {textHandlers.changePasswordHandler}
                    value = {pasText}
                    secureTextEntry
                />
                    <Text style={styles.errText}>{pasErr}{emptyValueErr}</Text>
                <TextInput
                    placeholder = 'Повторите пароль'
                    onChangeText = {textHandlers.changeRepitePasswordHandler}
                    value = {secondPasText}
                    secureTextEntry
                />
                    <Text style={styles.errText}>{repitePasErr}{emptyValueErr}</Text>
                    <Text style={styles.errText}> {serverErr}</Text>
                <Button
                    title = 'Подтвердить'
                    onPress = {handleButtonPress}
                />
        </View>
    )
};

const styles=StyleSheet.create({
    errText: {
        color: "red"
    }
});