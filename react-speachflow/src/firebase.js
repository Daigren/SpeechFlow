import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4EQ7eKgAF8ugPqF9bTuiGmAeRxrJE3cw",
  authDomain: "speechflow-app.firebaseapp.com",
  projectId: "speechflow-app",
  storageBucket: "speechflow-app.firebasestorage.app",
  messagingSenderId: "435012553752",
  appId: "1:435012553752:web:1b4b77bc2c4e8beaa8876d",
  measurementId: "G-JKKQ55D8NT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);