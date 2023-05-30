import SuccessScreen from "../screens/SuccessScreen";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <>
      <Stack.Screen name="Success" component={SuccessScreen} />
    </>
  );
};

export default HomeStack;
