import React, {useState} from 'react';
import {Text, Button, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { execRequest } from '../api/ExecuteRequest';
import { createRegisterConfig } from '../api/AuthUser';
import {useDispatch} from 'react-redux';
import {saveText} from '../redux/actionCreators';



export const RegistrationScreen = (props: any) => {

    const navigation = props.navigation;

    const dispatch = useDispatch();

    const [mailText,setMailText] = useState ("");
    const [pasText,setPasText] = useState ("");
    const [repitePasText, setRepitePasText] = useState ("");


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
        rightData: () => void,
        onlyMailErr: () => void,
        onlyPasErr: () => void,
        onlyRepitePasErr: () => void,
        onlyEmptyValueErr: () => void,
    };

    const clearErrorsFieldsHandler: typeErrFields = {
        rightData: () => {setMailErr(""), setPasErr(""), setRepitePasErr(""), setServerErr(""), setEmptyValueErr("") },
        onlyMailErr: () => {setPasErr(""), setRepitePasErr(""), setServerErr(""), setEmptyValueErr("")},
        onlyPasErr: () => {setMailErr(""),  setRepitePasErr(""), setServerErr(""), setEmptyValueErr("")},
        onlyRepitePasErr: () => {setMailErr(""), setPasErr(""), setServerErr(""), setEmptyValueErr("")},
        onlyEmptyValueErr: () => {setMailErr(""), setPasErr(""), setRepitePasErr(""), setServerErr("")},
    };

    const mailString: string = mailText;
    const searchElement = mailString.includes("@");
    const pasLength: number = pasText.length; 
    const maxPassword: boolean = pasLength<=16;
    const minPassword: boolean = pasLength>=5;
    const rightRepitePas: boolean = pasText===repitePasText;
    const notEmptyValue: boolean = mailText!==""&&pasText!==""&&repitePasText!=="";

    const validData: boolean = searchElement===true&&notEmptyValue&&maxPassword&&minPassword&&rightRepitePas;

    type typeErrors = {
        emptyValue:boolean, 
        errMail: boolean,
        errPasswordMaxLength: boolean, 
        errPasswordMinLength: boolean, 
        errRightRepitePas: boolean,
    };


    const errorsHandler: typeErrors = {

        emptyValue: mailText===""||pasText===""||repitePasText==="",
        errMail: searchElement===false,
        errPasswordMaxLength: pasLength>16,
        errPasswordMinLength: pasLength<5,
        errRightRepitePas: pasText!==repitePasText,
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
            clearErrorsFieldsHandler.rightData();
        }

        if (errorsHandler.emptyValue) {
            setEmptyValueErr (errorsMessage.errMessageEmptyValue);
            clearErrorsFieldsHandler.onlyEmptyValueErr();
        }

        if (errorsHandler.errMail&&!errorsHandler.emptyValue) {
            setMailErr (errorsMessage.errMessageMail);
            clearTextFieldsHandler.clearMailField();
            clearErrorsFieldsHandler.onlyMailErr();
        }

        if (errorsHandler.errPasswordMaxLength&&!errorsHandler.emptyValue) {
            setPasErr (errorsMessage.errMessageMaxPas);
            clearTextFieldsHandler.clearPasAndRepitePasField();
            clearErrorsFieldsHandler.onlyPasErr();
        }

        if (errorsHandler.errPasswordMinLength&&!errorsHandler.emptyValue) {
            setPasErr (errorsMessage.errMessageMinPas);
            clearErrorsFieldsHandler.onlyPasErr();
        }

        if (errorsHandler.errRightRepitePas&&!errorsHandler.emptyValue) {
            setRepitePasErr(errorsMessage.errMessageRightRepitePas);
            clearTextFieldsHandler.clearPasAndRepitePasField();
            clearErrorsFieldsHandler.onlyRepitePasErr();
        };

    };



    return (
        <View>
                <TextInput
                    style={styles.mailInput}
                    placeholder = 'Введите e-mail'
                    onChangeText = {textHandlers.changeLoginHandler}
                    value = {mailText}
                />
                    <Text style={styles.errText}>{mailErr}{emptyValueErr}</Text>

                <TextInput
                    style={styles.pasInput}
                    placeholder = 'Введите пароль'
                    onChangeText = {textHandlers.changePasswordHandler}
                    value = {pasText}
                    secureTextEntry
                />
                    <Text style={styles.errText}>{pasErr}{emptyValueErr}</Text>

                <TextInput
                    style={styles.repitePasInput}
                    placeholder = 'Повторите пароль'
                    onChangeText = {textHandlers.changeRepitePasswordHandler}
                    value = {repitePasText}
                    secureTextEntry
                />
                    <Text style={styles.errText}>{emptyValueErr}{repitePasErr}</Text>

                    <Text style={styles.errText}> {serverErr}</Text>
                
                <TouchableOpacity
                    onPress = {handleButtonPress}>
                        <Text style={styles.confirmButton}>Подтвердить</Text>
                </TouchableOpacity>
        </View>
    )
};

const styles=StyleSheet.create({

    errText: {
        marginRight: 51,
        color: "#9c434a",
        alignSelf: "center",
        fontWeight: "normal",
        fontSize: 15
    },
    mailInput: {
        marginTop: 180,
        alignSelf: "center",
        borderColor: "#b7c4df", 
        borderWidth: 1.5,
        width: 250,
        fontSize: 17
    },
    pasInput: {
        alignSelf: "center",
        borderColor: "#b7c4df", 
        borderWidth: 1.5,
        width: 250,
        fontSize: 17
    },
    repitePasInput: {
        alignSelf: "center",
        borderColor: "#b7c4df", 
        borderWidth: 1.5,
        width: 250,
        fontSize: 17
    },
    confirmButton: {
        color: "#7a97d8",
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 25,
    },
});