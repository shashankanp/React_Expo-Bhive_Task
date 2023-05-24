import "react-native-gesture-handler";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { AuthProvider } from "./providers/authProvider";
import Navcontainer from "./navigation/rootStack";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthProvider>
      <Navcontainer />
    </AuthProvider>
  );
}
