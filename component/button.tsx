import { View, Text, Pressable } from "react-native";
import React from "react";

const ButtonGreen = ({ text, navigation, link }) => {
  return (
    <Pressable className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700  font-medium text-lg  text-white w-1/2 justify-center align-middle ">
      <Text
        style={{ fontFamily: "Poppins_400Regular" }}
        className="text-center text-white font-medium text-xl "
        onPress={() => navigation.navigate(`${link}`)}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default ButtonGreen;
