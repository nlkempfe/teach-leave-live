import firebase from "firebase";

//Set up config object specific to out firestore app.
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

//Initialize the firestore app
firebase.initializeApp(config);

//Exports
export const auth = firebase.auth;
export const provider = new firebase.auth.FacebookAuthProvider();
