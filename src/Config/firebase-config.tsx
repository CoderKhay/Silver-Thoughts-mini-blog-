// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3dNSCziOEV9dEsVGU-hW5iwtNUTgxfsE",
  authDomain: "silver-thoughts.firebaseapp.com",
  projectId: "silver-thoughts",
  storageBucket: "silver-thoughts.firebasestorage.app",
  messagingSenderId: "708374498108",
  appId: "1:708374498108:web:f6043cab4dbd697c9bac39",
  measurementId: "G-KHEYFNDQ8H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
