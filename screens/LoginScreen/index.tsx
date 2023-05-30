import React from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useContext } from "react";
import Auth from "../../utils/auth";
import AuthContext from "../../providers/authProvider";

export default function Login() {
  // const [loading, setLoading] = useState(false);

  const { user, setUser, loading } = useContext(AuthContext);

  const { request, promptAsync, handleLogin } = Auth();
  useEffect(() => {
    setUser(user);
    // navigation.navigate("Dashboard", { screen: "DashboardScreen" });
  }, [user]);

  if (!user)
    return (
      <View className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg max-w-sm mx-auto">
        <Text
          className="text-3xl font-medium"
          style={{ fontFamily: "Poppins_400Regular" }}
        >
          Join Today
        </Text>
        <View className="py-4">
          <Text className="py-4" style={{ fontFamily: "Poppins_400Regular" }}>
            Sign in with one of the providers:
          </Text>
        </View>
        <View className="flex-col gap-4">
          <Pressable
            disabled={!request}
            onPress={() => {
              promptAsync();
              handleLogin();
            }}
            className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex-row align-middle gap-2 "
          >
            <AntDesign name="google" size={24} color="white" />
            <Text
              className="text-white pl-3"
              style={{ fontFamily: "Poppins_400Regular" }}
            >
              Sign in with Google
            </Text>
          </Pressable>
          {/* <Pressable className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex-row align-middle gap-2 ">
          <FontAwesome5 name="microsoft" size={24} color="white" />
          <Text
            className="text-white pl-3"
            style={{ fontFamily: "Poppins_400Regular" }}
          >
            Sign in with Microsoft
          </Text>
        </Pressable> */}
        </View>
      </View>
    );
  else {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }
}
