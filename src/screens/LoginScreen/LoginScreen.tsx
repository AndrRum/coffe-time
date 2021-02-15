import React, {useState, useEffect, useRef} from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {Icon} from "react-native-elements";
import {LoginManager} from "react-native-fbsdk";
import {saveUser} from "../../redux/UserReduser";
import {execRequest} from "../../api/ExecuteRequest";
import {createAuthConfig} from "../../api/AuthUser";
import {IReduxState} from "../../redux/UserReduser";
import styles from "./styles";
import {images} from "../../styles/images";

export const LoginScreen = (props: any) => {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const isMounted = useRef(true);
  const isLoggedIn = useSelector((state: IReduxState) => state.login);
  console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn != "") {
      navigation.navigate("HomeScreen");
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
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
    rightData: () => void;
    onlyAuthErr: () => void;
    onlyErrEmptyValue: () => void;
  };
  const clearFieldsHandler: typeErrFields = {
    rightData: () => {
      setMail(""), setPas(""), setAuthErr(""), setErrEmptyValue("");
    },
    onlyAuthErr: () => {
      setMail(""), setPas(""), setErrEmptyValue("");
    },
    onlyErrEmptyValue: () => {
      setMail(""), setPas(""), setAuthErr("");
    },
  };
  const onLoginSuccess = (result: any): void => {
    isMounted.current;
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
  const emptyValue = mail === "" || pas === "";

  const handleNavigate = (): void => {
    if (!emptyValue)
      execRequest(
        createAuthConfig({
          email: mail,
          password: pas,
        }),
      )
        .then(onLoginSuccess)
        .catch(onLoginFailure);
    else {
      setErrEmptyValue("  Заполните все поля формы");
      clearFieldsHandler.onlyErrEmptyValue();
    }
  };
  const passwordSecuredHandler = (): void => {
    setPasswordSecured(!passwordSecured);
  };
  const textButtonHandler = (): void => {
    navigation.push("RegistrationScreen");
  };
  const FBLoginSuccess = (result: any): void => {
    navigation.navigate("HomeScreen");
  };
  const err = () => {
    console.log("Login fail");
  };
  const FBLoginHandler = (): void => {
    LoginManager.logInWithPermissions(["public_profile"])
      .then(FBLoginSuccess)
      .catch(err);
  };

  return (
    <View>
      <ImageBackground source={images.BACKGROUND} style={styles.backImage}>
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(243,233,216,0.79)"]}
          style={styles.linearGradient}>
          <Text style={styles.logo}>CoffeTime</Text>
          <Text style={styles.secLogo}>территория кофе</Text>
          <View style={styles.mailInputView}>
            <TextInput
              style={styles.textMailInput}
              placeholder="Введите e-mail"
              onChangeText={mailChangeHandler}
              value={mail}
              placeholderTextColor="white"
            />
            <Icon color="white" name="user" type="font-awesome" size={25} />
          </View>
          <Text style={styles.errText}>{errEmptyValue}</Text>
          <View style={styles.pasInputView}>
            <TextInput
              style={styles.textPasInput}
              placeholder="Введите пароль"
              onChangeText={pasChangeHandler}
              value={pas}
              secureTextEntry={passwordSecured}
              placeholderTextColor="white"
            />
            <TouchableOpacity onPress={passwordSecuredHandler}>
              <Icon color="white" name="eye" type="font-awesome-5" size={25} />
            </TouchableOpacity>
          </View>
          <Text style={styles.errText}>
            {authErr}
            {errEmptyValue}
          </Text>
          <TouchableOpacity
            onPress={handleNavigate}
            style={styles.confirmButton}>
            <Text style={styles.confirmTextButton}>Подтвердить</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={textButtonHandler}
            style={styles.regButton}>
            <Text style={styles.regTextButton}>Регистрация</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonFB} onPress={FBLoginHandler}>
            <View style={styles.FBAll}>
              <Image source={images.ICON_FACEBOOK} style={styles.imageFB} />
              <Text style={styles.textButtonFB}>Войти через Facebook</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};
