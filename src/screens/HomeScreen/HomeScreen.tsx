import React from "react";
import {View, Text, Image} from "react-native";
import {useSelector} from "react-redux";
import {IReduxState} from "../../redux/UserReduser";
import styles from "./styles";

export const HomeScreen = () => {
  let checkSession = useSelector((state: IReduxState) => state.sessionId);
  let checkLogin = useSelector((state: IReduxState) => state.login);
  let checkPas = useSelector((state: IReduxState) => state.password);
  let checkPic = useSelector((state: IReduxState) => state.imagePath);

  console.log(`Session: ${checkSession}`);
  console.log(`Log: ${checkLogin}`);
  console.log(`Pas: ${checkPas}`);
  console.log(`Image: ${checkPic}`);

  return (
    <View>
      <Text> Пикча {checkPic}</Text>
      <Image source={{uri: checkPic}} style={styles.photo} />
      <Text>Сессия {checkSession}</Text>
      <Text>Логин {checkLogin}</Text>
      <Text>Пароль {checkPas}</Text>
    </View>
  );
};
