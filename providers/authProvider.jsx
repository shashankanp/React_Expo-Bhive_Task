// AuthProvider.js
import React, { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase"; // Import the auth service from your firebase.ts file

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser, token, setToken] = useState(null);

  useEffect(() => {
    const authSubscriber = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    // unsubscribe on unmount
    return authSubscriber;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
