import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export default function Profile() {
  return (
    <SafeAreaView>
      <View className="flex-row">
        <Image
          source={require("./../../assets/bhive_logo.png")}
          className="w-28 h-28 rounded-full ml-3 mt-2 "
        ></Image>
        <Text
          className="text-4xl ml-10 mt-6 font-medium"
          style={{ fontFamily: "Poppins_400Regular" }}
        >
          SHASHANKA
        </Text>
      </View>
      <View>
        <Text className="my-2">
          <Text
            style={{ fontFamily: "Poppins_400Regular" }}
            className="font-medium"
          >
            Name
          </Text>
          Shashanka
        </Text>
        <Text className="my-2">
          <Text
            style={{ fontFamily: "Poppins_400Regular" }}
            className="font-medium"
          >
            Email
          </Text>
          : shasha@gmaol.cm
        </Text>
        <Text className="my-2">
          <Text
            style={{ fontFamily: "Poppins_400Regular" }}
            className="font-medium"
          >
            Phone
          </Text>
          99383731727
        </Text>
        <Text className="my-2">
          <Text
            style={{ fontFamily: "Poppins_400Regular" }}
            className="font-medium"
          >
            Opportunity
          </Text>
          : FRE
        </Text>
      </View>
    </SafeAreaView>
  );
}
