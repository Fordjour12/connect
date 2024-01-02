import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

/**
 * Error in typescript but works
 * */
import { getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyAa93TRKZtZQ7Mz4G49B5xXlkOxPrJ1vH8",
  authDomain: "iocto-waffle.firebaseapp.com",
  projectId: "iocto-waffle",
  storageBucket: "iocto-waffle.appspot.com",
  messagingSenderId: "254165628489",
  appId: "1:254165628489:web:1b1f56ed68050aa3fd3198",
  measurementId: "G-RE369GRV9J",
};

const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const STORAGE = getStorage(app);
