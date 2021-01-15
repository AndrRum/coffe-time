import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {LoginScreen} from "../screens/LoginScreen";
import { RegistrationScreen } from "../screens/RegistrationScreen";
import {HomeScreen} from "../screens/HomeScreen";
import {SplashScreen} from "../screens/SplashScreen";


type RootStackParamList = {
    SplashScreen: undefined,
    LoginScreen: undefined,
    RegistrationScreen: undefined,
    HomeScreen: undefined,
  };

const Stack = createStackNavigator<RootStackParamList>();


 export const NavigationStack = (props: any) => {
     return (
        <Stack.Navigator
            screenOptions = {
                {
                     headerShown: false
                }
            }
        >
                    <Stack.Screen
                        name= "SplashScreen"
                        component= {SplashScreen}
                    />
                    <Stack.Screen
                        name= "LoginScreen"
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name= "RegistrationScreen"
                        component={RegistrationScreen}
                    />
                    <Stack.Screen
                        name= "HomeScreen"
                        component= {HomeScreen}
                    />
        </Stack.Navigator>
     )  
 };