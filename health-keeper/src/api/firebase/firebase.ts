import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from "./firebase.config";

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

//https://console.firebase.google.com/u/0/project/jfdzr11cb/overview