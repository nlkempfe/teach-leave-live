import React from "react";

/* Import bootstrap components */
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";

/* Import firebase app and products */
import {auth, provider} from "../firebase";


const AuthButton = (props) => {

    //Event handler to log the user in with Firebase auth()
    const handleLogin = () => {
        auth().signInWithPopup(provider).then((retUser) => {
            console.log(retUser.additionalUserInfo.profile.name);
            console.log(retUser);
            props.updateUser(retUser);
        })
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
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </DropdownButton>
            </div>
        )
    }
    else{
        //User is not logged in
        return (
            <div>
                <Button variant="primary" onClick={handleLogin}>Log in</Button>
            </div>
        )
    }

};
export default AuthButton;
