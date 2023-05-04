import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SuccessScreen from "./screens/SuccessScreen";
import FormScreen from "./screens/FormScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
// import "react-native-gesture-handler";
// import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          options={{ headerShown: false }}
          name="Form"
          component={FormScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Dashboard"
          component={DashboardScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Success"
          component={SuccessScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
