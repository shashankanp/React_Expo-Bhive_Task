import { View, Text, Button, Pressable, StyleSheet } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Auth from "../utils/auth";

export default function CustomDrawer(props: any) {
  const { handleLogout } = Auth();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={() => (
          <Pressable style={styles.button} onPress={handleLogout}>
            <Text style={styles.text}>Sign Out</Text>
          </Pressable>
        )}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
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
