import React, {useState} from "react";
import {Text,  View, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Image,  } from "react-native";
import { execRequest } from "../api/ExecuteRequest";
import { createRegisterConfig } from "../api/AuthUser";
import {useDispatch} from "react-redux";
import {saveLogPas,saveSessionId} from "../redux/UserReduser";
import LinearGradient from "react-native-linear-gradient";



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
    
    let sessionId: string = "ca2e8529-5242-4b07-b73e-0e68d15deb0b";

    const onRegisterSuccess = (result: any): void => {
        console.log(result);
        dispatch(saveSessionId(sessionId));
        dispatch(saveLogPas(mailText, pasText));
        navigation.navigate("HomeScreen");
    };

    const onRegisterFailure = (reason: any): void => {
        console.log(reason);
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
            <ImageBackground source={require("../assets/pictures/backGr.png")}
                             style={styles.backImage}>
                <LinearGradient 
                             colors = {["rgba(0,0,0,0)", "rgba(243,233,216,0.79)"]} 
                             style={styles.linearGradient}>
                        <Text style={styles.logo}>CoffeTime</Text>
                        <Text style={styles.secLogo}>территория кофе</Text>
                            <TouchableOpacity>
                                <Image source = {require("../assets/pictures/user_borders.png")}
                                       style = {styles.imageAvatar}
                                />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.mailInput}
                                placeholder = "Введите e-mail"
                                onChangeText = {textHandlers.changeLoginHandler}
                                value = {mailText}
                                placeholderTextColor = "white"
                            />

                            <Text style={styles.errText}>{mailErr}{emptyValueErr}</Text>

                            <TextInput
                                style={styles.pasInput}
                                placeholder = "Введите пароль"
                                onChangeText = {textHandlers.changePasswordHandler}
                                value = {pasText}
                                secureTextEntry
                                placeholderTextColor = "white"
                            />

                            <Text style={styles.errText}>{pasErr}{emptyValueErr}</Text>

                            <TextInput
                                style={styles.repitePasInput}
                                placeholder = "Повторите пароль"
                                onChangeText = {textHandlers.changeRepitePasswordHandler}
                                value = {repitePasText}
                                secureTextEntry
                                placeholderTextColor = "white"
                            />

                            <Text style={styles.errText}>{emptyValueErr}{repitePasErr}{serverErr}</Text>
                
                            <TouchableOpacity
                                onPress = {handleButtonPress}
                                style={styles.confirmButton}>
                                <Text style={styles.confirmTextButton}>Подтвердить</Text>
                            </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>  
        </View>  
    )
};

const styles=StyleSheet.create({

    errText: {
        color: "#b83030",
        alignSelf: "center",
        fontFamily: "SFUIText-Medium",
        fontSize: 11.2,
        backgroundColor: "rgba(153,143,113,0.47)",
        width: 300,
    },
    backImage: {
        height: 667,
        width: 375,
    },
    linearGradient: {
        height: 667,
        width: 375,
    },
    logo: {
        fontFamily: "Lobster-Regular",
        fontSize: 62,
        color: "white",
        alignSelf: "center",
        marginTop: 70,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    secLogo: {
        fontFamily: "SFUIText-Light",
        fontSize: 16,
        color: "white",
        marginLeft: 157,
        marginTop: -31,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    imageAvatar: {
        alignSelf: "center",
        marginTop: 30,
    },
    mailInput: {
        marginTop: 30,
        backgroundColor: "rgba(153,143,113,0.55)",
        alignSelf: "center",
        borderColor: "#ffffff", 
        borderWidth: 0,
        height: 37,
        width: 300,
        fontSize: 16,
        color: "white",
        fontFamily: "SFUIText-Medium"
    },
    pasInput: {
        marginTop: 10,
        backgroundColor: "rgba(153,143,113,0.55)",
        alignSelf: "center",
        borderColor: "#ffffff", 
        borderWidth: 0,
        height: 37,
        width: 300,
        fontSize: 16,
        color: "white",
        fontFamily: "SFUIText-Medium"
    },
    repitePasInput: {
        marginTop: 10,
        backgroundColor: "rgba(153,143,113,0.55)",
        alignSelf: "center",
        borderColor: "#ffffff", 
        borderWidth: 0,
        height: 37,
        width: 300,
        fontSize: 16,
        color: "white",
        fontFamily: "SFUIText-Medium"
    },
    confirmButton: {
        margin: 30,
        alignSelf: "center",
        backgroundColor: "#99b372",
        borderRadius: 100,
        width: 300,
        height: 52
    },
    confirmTextButton: {
        color: "white",
        alignSelf: "center",
        marginTop: 10,
        fontSize: 22,
        fontFamily: "SFUIText-Medium"
    },
});