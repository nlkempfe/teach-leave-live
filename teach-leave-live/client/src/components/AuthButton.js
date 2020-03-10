import React from "react";

/* Import bootstrap components */
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";

/* Import firebase app and products */
import {auth, provider, db} from "../firebase/firebase";


const AuthButton = (props) => {

    //Event handler to log the user in with Firebase auth()
    const handleLogin = () => {
        //Sign into Firestore with the facebook auth provider
        auth().signInWithPopup(provider).then((retUser) => {

            // console.log(retUser.additionalUserInfo.profile.name);
            // console.log(retUser.user.uid);
            console.log(retUser);
            props.updateUser(retUser);

            //Update the user document with the most recent sign-in information (info from fb)
            let userDoc = db.collection('users').doc(retUser.user.uid);
            let setUserDoc = userDoc.set({
                firstName : retUser.additionalUserInfo.profile.first_name,
                lastName : retUser.additionalUserInfo.profile.last_name,
                email : retUser.additionalUserInfo.profile.email,
                picURL : retUser.additionalUserInfo.profile.picture.data.url
            });
        });
    };

    //Event handler to sign the user out with Firebase auth()
    const logout = () => {
        auth().signOut().then(() => {
            props.updateUser(null);
        })

    };

    //Conditional return statements based on whether user is signed in
    if(props.user != null){

        //User is Logged in
        return(
            <div>
                <DropdownButton title={props.user.displayName}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </DropdownButton>
            </div>
        )
    }
    else{
        //User is not logged in
        return (
            <div>
                <Button variant="primary" onClick={handleLogin}>Facebook Sign-In</Button>
            </div>
        )
    }

};
export default AuthButton;
