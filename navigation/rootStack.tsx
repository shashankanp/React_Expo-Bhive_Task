import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "../providers/authProvider";
import DrawerNav from "./drawerNav";
import HomeStack from "./homeStack";
import AuthStack from "./authStack";

const Stack = createNativeStackNavigator();

const Navcontainer = () => {
  const { user, token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user || token ? (
          <>
            <Stack.Screen name="HomeDrawer" component={DrawerNav} />
            <Stack.Screen name="Success" component={HomeStack} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={AuthStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navcontainer;
