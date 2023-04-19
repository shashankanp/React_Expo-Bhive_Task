import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "process.env.GOOGLE_WEB_ID",
    iosClientId: "process.env.GOOGLE_IOS_ID",
    webClientId: "process.env.GOOGLE_ANDROID_ID",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUser(user);
      console.log("The user is: ", user);
      // if (loading) return <h1 className="text-3xl">Loading...</h1>;
    } catch (error) {
      console.log(error);
    }
  };

  // const route = useRouter();
  console.log(user?.displayName, user?.email, user?.uid);

  useEffect(() => {
    if (user) {
      axios
        .post("/api/user/add", {
          firebase_name: user?.displayName,
          firebase_mail: user?.email,
          firebase_uid: user?.uid,
        })
        .then((response) => {
          console.log("Firebase User Success:", response);
          return response.data;
        })
        .catch((err) => console.log("Firebase User Error:", err));
      // route.push("/dashboard");
    } else {
      // console.log("Login");
    }
  }, [user]);

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
        {user && (
          <>
            <View>
              <Text>{user.name}</Text>
            </View>
            <Image
              source={{ uri: user.picture }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </>
        )}
      </View>
      <View className="flex-col gap-4">
        <Pressable
          disabled={!request}
          onPress={() => promptAsync()}
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
        <Pressable className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex-row align-middle gap-2 ">
          <FontAwesome5 name="microsoft" size={24} color="white" />
          <Text
            className="text-white pl-3"
            style={{ fontFamily: "Poppins_400Regular" }}
          >
            Sign in with Microsoft
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
