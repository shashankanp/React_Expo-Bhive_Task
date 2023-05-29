import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCL4zdM0ZHOuwLvgrx1wajXd8qc2qu1QWE",
  authDomain: "task-c7f94.firebaseapp.com",
  projectId: "task-c7f94",
  storageBucket: "task-c7f94.appspot.com",
  messagingSenderId: "566539323126",
  appId: "566539323126:web:565fc256c3907d26b68ed7",
  measurementId: "G-HDCR8CE1BN",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const storage = getStorage(app);
