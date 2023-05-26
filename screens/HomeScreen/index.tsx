import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Lottie from "lottie-react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import UserLocation from "../../utils/location";

const getLocation = async () => {
  const { lat, long } = await UserLocation();
  console.log("Latitude:", lat, "Longitude:", long);
};

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    getLocation();
  }, []);
  // const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text
        className="text-3xl mt-10 mb-10 z-10"
        style={{ fontFamily: "Poppins_400Regular" }}
      >
        Join our amazing family of investors today!
      </Text>
      <Pressable className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700  font-medium text-lg  text-white w-1/2 justify-center align-middle ">
        <Text
          style={{ fontFamily: "Poppins_400Regular" }}
          className="text-center text-white font-medium text-xl "
          onPress={() => navigation.navigate("Login")}
        >
          Fill your first form!
        </Text>
      </Pressable>
      <Lottie
        source={require("./../../assets/stonks.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    // justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    position: "absolute",
    resizeMode: "cover",
    marginTop: "25%",
    height: 500,
    zIndex: -1,
  },
});
