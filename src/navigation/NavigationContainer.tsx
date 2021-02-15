import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {NavigationStack} from "./NavigationStack";

export const Container = () => {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
};
