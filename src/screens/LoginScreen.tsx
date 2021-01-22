import  React, {useState} from "react";
import {TextInput, View, StyleSheet, TouchableOpacity, Text, ImageBackground, Image } from "react-native";
import { execRequest } from "../api/ExecuteRequest";
import { createAuthConfig } from "../api/AuthUser";
import {useDispatch} from "react-redux";
import {saveUser} from "../redux/UserReduser";
import LinearGradient from "react-native-linear-gradient";
import { Icon } from "react-native-elements";
import { LoginManager } from "react-native-fbsdk";


export const LoginScreen = (props: any) => {

    const navigation = props.navigation; 
    const dispatch = useDispatch();
    const [mail, setMail] = useState("");
    const [pas, setPas] = useState("");
    const [authErr, setAuthErr] = useState("");
    const [errEmptyValue, setErrEmptyValue] = useState("");
    const [passwordSecured, setPasswordSecured] = useState(true);
    const mailChangeHandler = (text: string) => {
        setMail(text);
    };
    const pasChangeHandler = (text: string) => {
        setPas(text);
    };

    type typeErrFields = {
        rightData: () => void,
        onlyAuthErr: () => void,
        onlyErrEmptyValue: () => void,
    };

    const clearFieldsHandler: typeErrFields = {
        rightData: () => {setMail(""), setPas(""), setAuthErr(""), setErrEmptyValue("") },
        onlyAuthErr: () => {setMail(""), setPas(""), setErrEmptyValue("")},
        onlyErrEmptyValue: () => {setMail(""), setPas(""), setAuthErr("")},
    };


    const onLoginSuccess = (result: any): void => {
        console.log(result);
        dispatch(saveUser(mail, pas, result.data));
        console.log(`Session: ${result.data}`);
        navigation.navigate("HomeScreen");
        clearFieldsHandler.rightData();
    };


    const onLoginFailure = (reason: any): void => {
        console.log(reason);
        setAuthErr("  Логин и/или пароль не совпадают");
        clearFieldsHandler.onlyAuthErr();
    };

    const emptyValue = mail===""||pas==="";

    const handleNavigate = ():void => {

        if (!emptyValue)
        execRequest(createAuthConfig({
            email: mail,
            password: pas,
        })).then(onLoginSuccess).catch(onLoginFailure);
        else {
            setErrEmptyValue("  Заполните все поля формы");
            clearFieldsHandler.onlyErrEmptyValue();
        }
    };

    const passwordSecuredHandler = (): void => {
        setPasswordSecured(!passwordSecured);
    };
    
    const textButtonHandler = (): void => {
        navigation.navigate("RegistrationScreen");
    };

    const FBLoginHandler = (): void => {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
              if (result.isCancelled) {
                console.log("Login cancelled");
              } else {
                console.log("Login success with permissions");
                navigation.navigate("HomeScreen");
              }
            },
            function (error) {
              console.log("Login fail with error: " + error);
            }
        );
    };
       
    

    return (

        <View>
            <ImageBackground 
                source={require("../assets/pictures/backGr.png")}
                style={styles.backImage}>
                <LinearGradient 
                    colors = {["rgba(0,0,0,0)", "rgba(243,233,216,0.79)"]} 
                    style={styles.linearGradient}>
                        <Text style={styles.logo}>CoffeTime</Text>
                        <Text style={styles.secLogo}>территория кофе</Text>

                            <View style={styles.mailInputView}> 
                                <TextInput 
                                    style={styles.textMailInput}
                                    placeholder = "Введите e-mail"
                                    onChangeText = {mailChangeHandler}
                                    value = {mail}
                                    placeholderTextColor = "white"
                                />
                                <Icon
                                    color="white"
                                    name="user"
                                    type="font-awesome"
                                    size={25}
                                />
                            </View>

                            <Text style={styles.errText}>{errEmptyValue}</Text>

                         <View style={styles.pasInputView}>
                                    <TextInput
                                        style={styles.textPasInput}
                                        placeholder = "Введите пароль"
                                        onChangeText = {pasChangeHandler}
                                        value = {pas}
                                        secureTextEntry={passwordSecured}
                                        placeholderTextColor = "white"
                                    />
                                    <TouchableOpacity 
                                        onPress={passwordSecuredHandler}>
                                        <Icon
                                            color="white"
                                            name="eye"
                                            type="font-awesome-5"
                                            size={25}
                                        />
                                    </TouchableOpacity>
                                </View>
                            <Text style={styles.errText}>{authErr}{errEmptyValue}</Text>
                            
                                <TouchableOpacity
                                    onPress = {handleNavigate}
                                    style={styles.confirmButton}>
                                        <Text style={styles.confirmTextButton}>Подтвердить</Text>
                                 </TouchableOpacity>

                                <TouchableOpacity
                                    onPress = {textButtonHandler}
                                    style = {styles.regButton}>
                                        <Text style={styles.regTextButton}>Регистрация</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style = {styles.buttonFB}
                                    onPress={FBLoginHandler}>
                                        <View style = {styles.FBAll}>
                                            <Image source = {require("../assets/pictures/icon_facebook.png")}
                                                   style = {styles.imageFB}/> 
                                                <Text style = {styles.textButtonFB}>Войти через Facebook</Text>
                                        </View> 
                                </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>  
        </View>  
    )
};

const styles=StyleSheet.create({

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
        marginTop: 80,
        marginRight: 14,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    secLogo: {
        fontFamily: "SFUIText-Light",
        fontSize: 16,
        color: "white",
        marginLeft: 157,
        marginTop: -31,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    mailInputView: {
        flexDirection: "row",
        backgroundColor: "rgba(153,143,113,0.55)", 
        paddingHorizontal: 10,
        height: 44,
        width: 300,
        display: "flex",
        alignItems: "center",
        borderRadius: 8,
        marginLeft: 30,
        marginTop: 76
    },
    textMailInput: {
        fontSize: 16,
        color: "white",
        fontFamily: "SFUIText-Medium",
        flex: 1, 
        paddingHorizontal: 12,
    },
    pasInputView: {
        flexDirection: "row",
        backgroundColor: "rgba(153,143,113,0.55)", 
        paddingHorizontal: 10,
        height: 44,
        width: 300,
        display: "flex",
        alignItems: "center",
        borderRadius: 8,
        marginLeft: 30,
    },
    textPasInput: {
        fontSize: 16,
        color: "white",
        fontFamily: "SFUIText-Medium",
        flex: 1, 
        paddingHorizontal: 12,
    },
    confirmButton: {
        margin: 18,
        marginLeft: 30,
        backgroundColor: "#b5cc93",
        borderRadius: 100,
        width: 300,
        height: 52,
    },
    confirmTextButton: {
        color: "white",
        alignSelf: "center",
        marginTop: 10,
        fontSize: 22,
        fontFamily: "SFUIText-Medium",
    },
    regButton: {
        marginBottom: 25,
        marginLeft: 30,
        backgroundColor: "#b5cc93",
        borderRadius: 100,
        width: 300,
        height: 52,
    },
    regTextButton: {
        color: "white",
        alignSelf: "center",
        marginTop: 10,
        fontSize: 22,
        fontFamily: "SFUIText-Medium",
    },
    FBAll: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    buttonFB: {
        marginTop: 40,
        marginLeft: 30,
        backgroundColor: "#3B5998",
        borderRadius: 100,
        width: 300,
        height: 52,
    },
    textButtonFB: {
        color: "white",
        alignSelf: "center",
        fontSize: 18,
        fontFamily: "SFUIText-Medium",
        marginRight: 28,
        marginTop: 10,
    },
    imageFB: {
        marginTop: 13,
        marginLeft: 30,
        alignSelf: "center",
    },
    errText: {
        color: "#b83030",
        alignSelf: "center",
        fontFamily: "SFUIText-Medium",
        fontSize: 12,
        width: 300,
    },
});