import firebase from "firebase/compat/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAVD-Mzae5Be7CLxAxCBhIzxqWeIFof1G4",
  authDomain: "register-fa6ca.firebaseapp.com",
  projectId: "register-fa6ca",
  storageBucket: "register-fa6ca.appspot.com",
  messagingSenderId: "834750198317",
  appId: "1:834750198317:web:ee4acefa0822518cbefea4",
  measurementId: "G-KWV0HBVYLK"
};

if(!firebase.apps.length ){
const app = initializeApp(firebaseConfig);}


export {firebase};