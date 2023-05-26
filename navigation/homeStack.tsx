import SuccessScreen from "../screens/SuccessScreen";
import FormScreen from "../screens/FormScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Dashboard"
        component={DashboardScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Form"
        component={FormScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Success"
        component={SuccessScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
    </>
  );
};

export default HomeStack;
