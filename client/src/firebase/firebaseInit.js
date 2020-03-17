//Import Firebase app
import firebase from "firebase";

//Import private config structure for initialization
import config from "../firebaseConfig";

firebase.initializeApp(config);

//Exports
export const auth = firebase.auth;
export const provider = new firebase.auth.FacebookAuthProvider();
export const db = firebase.firestore();