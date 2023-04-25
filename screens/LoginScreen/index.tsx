import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import axios from "axios";
import UserLocation from "../../utils/location";
import Auth from "../../utils/auth";

WebBrowser.maybeCompleteAuthSession();

const getLocation = async () => {
  const { lat, long } = await UserLocation();
  // console.log("Latitude:", lat, "Longitude:", long);
};

getLocation();

export default function Login() {
  const { user, request, promptAsync } = Auth();

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
