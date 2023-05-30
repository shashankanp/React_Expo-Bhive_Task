import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "../providers/authProvider";
import DrawerNav from "./drawerNav";
import MainStack from "./mainStack";
import AuthStack from "./authStack";

const Stack = createNativeStackNavigator();

const Navcontainer = () => {
  const { user, token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user || token ? (
          <>
            <Stack.Screen name="Drawer" component={DrawerNav} />
            <Stack.Screen name="Success" component={MainStack} />
          </>
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navcontainer;
