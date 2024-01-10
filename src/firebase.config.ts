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
};

const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const STORAGE = getStorage(app);
