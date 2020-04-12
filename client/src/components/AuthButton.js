import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';

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

var stripe = window.Stripe('pk_test_EAXk2U8zR7fVlKNW9sUoACCl006fPFA1kk');

const AuthButton = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    //Event handler to log the user in with Firebase auth()
    const handleLogin = () => {
        //Sign into Firebase with fb auth provider
        auth().signInWithPopup(provider).then(async (retUser) => {
            //Update (or add) user document with most recent sign-in information (from fb)
            let userDoc = db.collection('users').doc(retUser.user.uid);

            // Only update date if new account
            let data = await userDoc.get().then(snapshot => {
               if(snapshot.exists){
                  return snapshot.data();
               } else {
                 return {};
               }
            });

            //set the user doc ensuring that undefined values become default values
            userDoc.set({
                uid : ('uid' in data ? data.uid : retUser.user.uid),
                email : (retUser.additionalUserInfo.profile.email ? retUser.additionalUserInfo.profile.email : "N/A"),
                firstName : (retUser.additionalUserInfo.profile.first_name),
                lastName : (retUser.additionalUserInfo.profile.last_name),
                picURL : (retUser.additionalUserInfo.profile.picture.data.url),
                premium: ('premium' in data ? data.premium : false),
                role: ('role' in data ? data.role : 'user'),
                blogPermission: ('blogPermission' in data ? data.blogPermission : false),
                commentPermission: ('commentPermission' in data ? data.commentPermission : true)
            });
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
                    <MenuItem onClick={() =>{
                        fetch('/stripe')
                            .then(r => r.json())
                            .then(d => {
                                stripe.redirectToCheckout({
                                    sessionId: d.id,
                                }).then(function (result) {
                                    console.log(result);
                                })
                            })
                    }}>Checkout</MenuItem>
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
