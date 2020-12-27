import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {LoginScreen} from '../screens/LoginScreen'
import { PasswordScreen } from '../screens/PasswordScreen'
import { RegistrationScreen } from '../screens/RegistrationScreen'
import {HomeScreen} from '../screens/HomeScreen'


type RootStackParamList = {
    LoginScreen: undefined,
    PasswordScreen: undefined,
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
                        name= 'LoginScreen'
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name= 'RegistrationScreen'
                        component={RegistrationScreen}
                    />
                    <Stack.Screen 
                        name= 'PasswordScreen' 
                        component={PasswordScreen} 
                    />
                    <Stack.Screen
                        name= 'HomeScreen'
                        component= {HomeScreen}
                    />
        </Stack.Navigator>
     )  
 }