import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {HeaderBackButton} from "@react-navigation/stack";
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
        >
                    <Stack.Screen
                        name= "SplashScreen"
                        component= {SplashScreen}
                        options = {{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name= "LoginScreen"
                        component={LoginScreen}
                        options = {{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name= "RegistrationScreen"
                        component={RegistrationScreen}
                        options = {{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name= "HomeScreen"
                        component= {HomeScreen}
                        options={{
                            headerLeft: (props) => (
                                <HeaderBackButton
                                  {...props}
                                  onPress={() => {
                                    // navigation.navigate("SplashScreen");
                                  }}
                                />
                              ),
                            title: "CoffeTime",
                            headerTitleAlign: "center",
                        }}
                    />
        </Stack.Navigator>
     )  
 };