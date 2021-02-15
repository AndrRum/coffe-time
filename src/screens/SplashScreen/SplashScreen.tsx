import React, {useEffect} from "react";
import {View, Text} from "react-native";
import {useSelector} from "react-redux";
import LottieView from "lottie-react-native";
import styles from "./styles";
import {images} from "../../styles/images";
import {IReduxState} from "../../redux/UserReduser";

export const SplashScreen = (props: any) => {
  const navigation = props.navigation;
  const isLoggedIn = useSelector((state: IReduxState) => state.login);
  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn != "") {
        navigation.replace("HomeScreen");
      }
      else {
        navigation.replace("LoginScreen");
      }
    }, 3000);
  }, [navigation]);

  interface boolAutoPlay {
    autoPlay?: boolean | undefined;
    loop?: boolean | undefined;
  }
  const autoPlayLoop: boolAutoPlay = {
    autoPlay: true,
    loop: true,
  };

  return (
    <View style={styles.backGround}>
      <LottieView
        source={images.SPLASH_ANIMATION}
        {...autoPlayLoop}
        style={styles.splashView}
      />
      <Text style={styles.logo}>CoffeTime</Text>
    </View>
  );
};