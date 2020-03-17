/* Import Firebase app */
import firebase from "firebase";

/* Import environment variables for initialization */
import config from '../firebaseConfig.js';

const credentials = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || config.apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || config.authDomain,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || config.databaseURL,
  projectId: 'teach-leave-live',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || config.storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || config.messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_APP_ID || config.appId,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || config.measurementId
};

firebase.initializeApp(credentials);

/* Exports */
export const auth = firebase.auth;
export const provider = new firebase.auth.FacebookAuthProvider();
export const db = firebase.firestore();
