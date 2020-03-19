import React, {useState} from "react";

/* Import material-ui components */
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

/* Import material-ui icons */
import FacebookIcon from '@material-ui/icons/Facebook';

/* Import firebase products */
import {auth, provider, db} from "../firebase/firebaseInit";

const AuthButton = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    //Event handler to log the user in with Firebase auth()
    const handleLogin = () => {
        //Sign into Firebase with fb auth provider
        auth().signInWithPopup(provider).then((retUser) => {

            //Update current user throughout app
            props.updateUser(retUser);

            //Update (or add) user document with most recent sign-in information (from fb)
            let userDoc = db.collection('users').doc(retUser.user.uid);
            let setUserDoc = userDoc.set({
                firstName : retUser.additionalUserInfo.profile.first_name,
                lastName : retUser.additionalUserInfo.profile.last_name,
                email : retUser.additionalUserInfo.profile.email,
                picURL : retUser.additionalUserInfo.profile.picture.data.url,
                role: "user"
            });
        });
    };

    //Event handler to log the user out with Firebase auth()
    const handleLogout = () => {
        auth().signOut().then(() => {
            props.updateUser(null);
        });
        handleClose();
    };

    //Event handlers for the menu that is displayed when user is logged in
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    //Conditional return buttons based on whether a user is logged in
    if(props.currUser != null){
        //User is logged in -> Display button to allow logout
        return (
            <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    {props.currUser.displayName}
                </Button>
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
    else{
        //User is not logged in -> Display button to allow login
        return (
            <div>
                <Button startIcon={<FacebookIcon />} onClick={handleLogin}>
                    Login
                </Button>
            </div>
        );
    }



};

export default AuthButton;
