import Lottie from "lottie-react-native";
import { View, Text, StyleSheet } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

export default function Success() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      className=" flex items-center justify-center relative"
      style={styles.container}
    >
      <View className=" rounded-lg text-gray-700 p-16 text-center ">
        <Lottie
          source={require("./../../assets/confetti.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text
          className="text-3xl pb-4 font-medium"
          style={{ fontFamily: "Poppins_400Regular" }}
        >
          Thank you for submitting your data!✨
        </Text>
        <Text
          className="text-2xl pt-4 font-medium"
          style={{ fontFamily: "Poppins_400Regular" }}
        >
          Check out your{" "}
          {/* <Link href={"./dashboard"} className="underline">
            dashboard
          </Link>{" "} */}
          to see your info
        </Text>
        <Text
          className="text-2xl pt-4 font-medium"
          style={{ fontFamily: "Poppins_400Regular" }}
        >
          You can click{" "}
          {/* <Link href={"./form"} className="underline">
            here
          </Link>{" "} */}
          to fill out another form{" "}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    position: "absolute",
    resizeMode: "cover",
    // marginTop: "25%",
    // height: 500,
    zIndex: -1,
  },
});
