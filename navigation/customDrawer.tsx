import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useContext, useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Auth from "../utils/auth";
import AuthContext from "../providers/authProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CustomDrawer(props: any) {
  const { user, setUser } = useContext(AuthContext);
  const { handleLogout } = Auth();

  const getData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("@storage_Key");
      if (storedData !== null) {
        const storedUser = JSON.parse(storedData);
        if (JSON.stringify(storedUser) !== JSON.stringify(user)) {
          setUser(storedUser);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [user]);

  //   console.log("User is: ", user?.image);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#1e4620" }}
      >
        <ImageBackground
          source={require("../assets/green-bg.jpg")}
          style={{ padding: 20 }}
        >
          <Image
            source={{ uri: user?.image }}
            style={{
              height: 90,
              width: 90,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 28,
              fontFamily: "Poppins_400Regular",
            }}
          >
            {user?.name}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <DrawerItem
          label={() => (
            <Pressable style={styles.button} onPress={handleLogout}>
              <Text style={styles.text}>Sign Out</Text>
            </Pressable>
          )}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: "auto",
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
