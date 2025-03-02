/* Import Firebase app */
import firebase from 'firebase';
 //import config from "../firebaseConfig";
require("firebase/firestore");

/* Import environment variables for initialization */
 const config = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID,
   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
 };

firebase.initializeApp(config);

/* Exports */
export const auth = firebase.auth;
export const provider = new firebase.auth.FacebookAuthProvider();
export const db = firebase.firestore();
export const firestore = firebase.firestore;
