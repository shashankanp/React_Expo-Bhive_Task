import React, { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.log("Error loading token from AsyncStorage:", error);
      }
    };

    loadUser();

    const authSubscriber = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    // unsubscribe on unmount
    return authSubscriber;
  }, []);

  useEffect(() => {
    const storeToken = async () => {
      try {
        if (token) {
          await AsyncStorage.setItem("token", token);
        } else {
          await AsyncStorage.removeItem("token");
        }
      } catch (error) {
        console.log("Error storing token in AsyncStorage:", error);
      }
    };

    storeToken();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, image, setImage }}
    >
      {children}
    </AuthContext.Provider>
  );
}
