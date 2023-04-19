// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { useState, useEffect } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.APP_PUBLIC_API_KEY,
  authDomain: process.env.APP_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.APP_PUBLIC_PROJECT_ID,
  storageBucket: process.env.APP_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.APP_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.APP_PUBLIC_APP_ID,
  measurementId: process.env.APP_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
let analytics: any;
const app = initializeApp(firebaseConfig);
if (app.name && typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return [user, loading];
};

export default useAuthState;

export const storage = getStorage(app);

export const auth = getAuth();
