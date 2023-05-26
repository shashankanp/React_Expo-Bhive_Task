import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../providers/authProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (user: any) => {
    try {
      const inputDetails = JSON.stringify(user);
      await AsyncStorage.setItem("@storage_Key", inputDetails);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("@storage_Key");
      if (storedData !== null) {
        const user = JSON.parse(storedData);
        setUser(user);
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setAddress(user.address);
        setImage(user.image);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveChanges = () => {
    const updatedUser = { ...user, name, email, phone, address, image };
    setUser(updatedUser);
    storeData(updatedUser);
  };

  return (
    <SafeAreaView>
      <View className="p-4">
        <View>
          <View className="flex-row align-middle justify-center ">
            <Image
              source={{ uri: image || user.picture }}
              className="w-28 h-28 pb-3 rounded-full ml-5 -mr-3 "
            />
            <FontAwesome5
              name="user-edit"
              size={24}
              color="black"
              style={{ alignSelf: "flex-end" }}
              onPress={() => {
                pickImage();
                saveChanges();
              }}
            />
          </View>
          <TextInput
            style={{ fontFamily: "Poppins_400Regular" }}
            value={name}
            onChangeText={setName}
            className="text-3xl text-center pt-3"
          />
        </View>
        <View className="">
          <View className="flex-row">
            <Text
              style={{ fontFamily: "Poppins_400Regular" }}
              className="my-2 text-xl"
            >
              Email:{" "}
            </Text>
            <TextInput
              style={{ fontFamily: "Poppins_400Regular" }}
              value={email}
              onChangeText={setEmail}
              className="text-xl"
            />
          </View>
          <View className="flex-row">
            <Text
              style={{ fontFamily: "Poppins_400Regular" }}
              className="my-2 text-xl"
            >
              Phone:{" "}
            </Text>
            <TextInput
              style={{ fontFamily: "Poppins_400Regular" }}
              value={phone}
              onChangeText={setPhone}
              className="text-xl"
            />
          </View>
          <View className="flex-row pb-5">
            <Text
              style={{ fontFamily: "Poppins_400Regular" }}
              className="my-2 text-xl"
            >
              Address:{" "}
            </Text>
            <TextInput
              style={{ fontFamily: "Poppins_400Regular" }}
              value={address}
              onChangeText={setAddress}
              className="text-xl"
            />
          </View>
          {/* <View className="align-middle justify-center pb-3">
            <Button
              title="Pick an image from camera roll"
              onPress={() => {
                pickImage();
                saveChanges();
              }}
            />
          </View> */}
          <TouchableOpacity className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700  font-medium text-lg  text-white w-1/2 mx-auto">
            <Text
              style={{ fontFamily: "Poppins_400Regular" }}
              className="text-center text-white font-medium text-xl "
              onPress={saveChanges}
            >
              Save changes!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
