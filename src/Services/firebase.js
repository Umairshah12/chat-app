import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWjF190y-bcURJ-1Omt3vnwkE7uam3Vvo",
  authDomain: "chat-app-eabcc.firebaseapp.com",
  databaseURL: "https://chat-app-eabcc.firebaseio.com",
  projectId: "chat-app-eabcc",
  storageBucket: "chat-app-eabcc.appspot.com",
  messagingSenderId: "130095655238",
  appId: "1:130095655238:web:ba7f299b04b55b04f65d47",
  measurementId: "G-68HR5TZL0C",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();
