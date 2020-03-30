import React, {useState} from 'react';

/* Import material-ui components */
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link'

/* Import material-ui icons */
import FacebookIcon from '@material-ui/icons/Facebook';

/* Import firebase products */
import {auth, provider, db} from '../firebase/firebaseInit';
import {readUser} from "../firebase/controllers";

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

            //Email might not be shared, set user doc accordingly.
            if(retUser.additionalUserInfo.profile.email){
                userDoc.set({
                    uid : retUser.user.uid,
                    email : retUser.additionalUserInfo.profile.email,
                    firstName : retUser.additionalUserInfo.profile.first_name,
                    lastName : retUser.additionalUserInfo.profile.last_name,
                    picURL : retUser.additionalUserInfo.profile.picture.data.url,
                    role: 'user'
                });
            }
            else{
                userDoc.set({
                    uid : retUser.user.uid,
                    email: "N/A",
                    firstName : retUser.additionalUserInfo.profile.first_name,
                    lastName : retUser.additionalUserInfo.profile.last_name,
                    picURL : retUser.additionalUserInfo.profile.picture.data.url,
                    role: 'user'
                });
            }
        });
    };

    //Event handler to log the user out with Firebase auth()
    const handleLogout = () => {
        localStorage.removeItem("currentUser");
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

    let user = readUser();

    //Conditional return buttons based on whether a user is logged in
    if(user != null){
        //User is logged in -> Display button to allow logout

        return (
            <div>
                <Button aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
                    {user.firstName}
                </Button>
                <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem disabled={props.disableAccount} onClick={handleClose} component={Link} href='/account' style={{textDecoration: 'none', color: 'inherit'}}>Account</MenuItem>
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
