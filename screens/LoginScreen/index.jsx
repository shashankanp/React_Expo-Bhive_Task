import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect, useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import Auth from "../../utils/auth";
import AuthContext from "../../providers/authProvider";

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const { request, promptAsync } = Auth();
  useEffect(() => {
    setUser(user);
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
}
