import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from "./firebase.config";
import { getAuth } from "firebase/auth";

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)

//https://console.firebase.google.com/u/0/project/jfdzr11cb/overview