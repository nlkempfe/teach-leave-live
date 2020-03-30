/* Import Firebase app */
import firebase from 'firebase';
// import config from "../firebaseConfig";

/* Import environment variables for initialization */
// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

const config = {
    apiKey: "AIzaSyDWipDGZ1j4xN632UILLy4QTD_SLDzSx7g",
    authDomain: "teach-leave-live.firebaseapp.com",
    databaseURL: "https://teach-leave-live.firebaseio.com",
    projectId: "teach-leave-live",
    storageBucket: "teach-leave-live.appspot.com",
    messagingSenderId: "1083048857113",
    appId: "1:1083048857113:web:54f27845f4e66ac65d2488",
    measurementId: "G-9JCJ226ZD6"
};

firebase.initializeApp(config);

/* Exports */
export const auth = firebase.auth;
export const provider = new firebase.auth.FacebookAuthProvider();
export const db = firebase.firestore();
