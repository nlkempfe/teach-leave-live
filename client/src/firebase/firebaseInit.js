/* Import Firebase app */
import firebase from "firebase";

/* Import environment variables for initialization */
import config from '../firebaseConfig.js';

const prodConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || config.apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || config.authDomain,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || config.databaseURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || config.projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || config.storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || config.messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_APP_ID || config.appId,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || config.measurementId
};

const devConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
}

const credentials =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

firebase.initializeApp(credentials);

/* Exports */
export const auth = firebase.auth;
export const provider = new firebase.auth.FacebookAuthProvider();
export const db = firebase.firestore();
