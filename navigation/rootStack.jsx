import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SuccessScreen from "../screens/SuccessScreen";
import FormScreen from "../screens/FormScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AuthContext from "../providers/authProvider";

const Stack = createNativeStackNavigator();

const Navcontainer = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
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
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={HomeScreen}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navcontainer;
