import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormScreen from "./screens/FormScreen";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

const Stack = createNativeStackNavigator();

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
          name="Form"
          component={FormScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
