import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {StackScreenProps} from "@react-navigation/stack";
import {LoginScreen} from "../screens/LoginScreen/LoginScreen";
import {RegistrationScreen} from "../screens/RegistrationScreen/RegistrationScreen";
import {HomeScreen} from "../screens/HomeScreen/HomeScreen";
import {SplashScreen} from "../screens/SplashScreen/SplashScreen";
import {Header} from "../components/Header";

type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  RegistrationScreen: undefined;
  HomeScreen: undefined;
};

export type splashProps = StackScreenProps<RootStackParamList, "SplashScreen">;
export type loginProps = StackScreenProps<RootStackParamList, "LoginScreen">;
export type regProps = StackScreenProps<
  RootStackParamList,
  "RegistrationScreen"
>;

const Stack = createStackNavigator<RootStackParamList>();

export const NavigationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: () => <Header />,
          headerLeft: () => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{
          headerTitle: () => <Header />,
          headerLeft: () => {
            return null;
          },
        }}
      />
    </Stack.Navigator>
  );
};
