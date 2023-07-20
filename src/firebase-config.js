// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd_PLGgHWGxzne4NmcdV1a-_GkWtvmjSw",
  authDomain: "chata-17cd3.firebaseapp.com",
  projectId: "chata-17cd3",
  storageBucket: "chata-17cd3.appspot.com",
  messagingSenderId: "953001019767",
  appId: "1:953001019767:web:7cc280fe87414755d57972",
  measurementId: "G-MR5RZSKQSY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
