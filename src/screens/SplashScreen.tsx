import React, {useEffect}  from "react";
import {View,Text, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import LottieView from "lottie-react-native";

export const SplashScreen = (props: any) => {
    const navigation = props.navigation; 
    const isLoggedIn = useSelector((state: any) => state.password);
    useEffect (()=>{
        setTimeout(()=>{
            navigateToLoginOrHomeScreen();
        },  3000) 
    }, 
    [navigation]);

    const navigateToLoginOrHomeScreen = () => {
        if (isLoggedIn!=="") {
            console.log ("Logged")
            navigation.navigate("LoginScreen")
            }
        else {
            console.log ("NoLogged")
            navigation.navigate("LoginScreen")
            }
    };

    return (
        <View style = {styles.backGround}>
            <LottieView source={require("../assets/pictures/18342-coffee.json")} autoPlay loop
                        style = {styles.splashView} />
            <Text style={styles.logo}>CoffeTime</Text>
        </View>
    );
};

const styles=StyleSheet.create({
    backGround: {
        flex: 1,
        backgroundColor:  "#ffffff"
    },
    splashView: {
        alignSelf: "center",
        width: 400,
        height: 400,
        marginTop: 40
    },
    logo: {
        fontFamily: "Lobster-Regular",
        fontSize: 45,
        color: "#57a362",
        opacity: 0.75,
        alignSelf: "center",
    },
 });
