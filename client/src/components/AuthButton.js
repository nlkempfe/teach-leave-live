import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {debounce} from 'lodash';

/* Import material-ui components */
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

/* Import material-ui icons */
import FacebookIcon from '@material-ui/icons/Facebook';

/* Import firebase products */
import {auth, provider, db} from '../firebase/firebaseInit';
import {readUser} from "../firebase/controllers";

var stripe = window.Stripe('pk_test_EAXk2U8zR7fVlKNW9sUoACCl006fPFA1kk');

const AuthButton = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [isError, setIsError] = useState(false);

    //Event handler to log the user in with Firebase auth()
    const handleLogin = () => {
        //Sign into Firebase with fb auth provider
        auth().signInWithPopup(provider).then(async (retUser) => {

            //Update current user throughout app
            props.updateUser(retUser);

            //Update (or add) user document with most recent sign-in information (from fb)
            let userDoc = db.collection('users').doc(retUser.user.uid);

            // Only update role if new account -> default to user role
            let role = await userDoc.get().then(snapshot => {
               if(snapshot.exists){
                  return snapshot.data().role;
               } else {
                 return 'user';
               }
            });

            // Only update premium status if new account -> default to not premium
            let premium = await userDoc.get().then(snapshot => {
               if(snapshot.exists){
                  return snapshot.data().premium;
               } else {
                 return false;
               }
            });

            //Email might not be shared, set user doc accordingly.
            if(retUser.additionalUserInfo.profile.email){
                userDoc.set({
                    uid : retUser.user.uid,
                    email : retUser.additionalUserInfo.profile.email,
                    firstName : retUser.additionalUserInfo.profile.first_name,
                    lastName : retUser.additionalUserInfo.profile.last_name,
                    picURL : retUser.additionalUserInfo.profile.picture.data.url,
                    premium: premium,
                    role: role
                });
            }
            else{
                userDoc.set({
                    uid : retUser.user.uid,
                    email: "N/A",
                    firstName : retUser.additionalUserInfo.profile.first_name,
                    lastName : retUser.additionalUserInfo.profile.last_name,
                    picURL : retUser.additionalUserInfo.profile.picture.data.url,
                    premium: premium,
                    role: role
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

    /* On submission checks if email is in correct format but not the check is not too extensive
       to prevent users with weird addresses from entering email. Just checking for '@' and '.' mostly.
       If it doesn't match don't submit and create an error on the TextField. Add any functionality upon
       submitting in the if statement*/
    const handleSubmit = () => {
        if (email.match(/\S+@\S+\.\S+/))
        {
            handleNewsletterClose();
            handleClose();
        }
        else
        {
            setErrorText('Invalid Email');
            setIsError(true);
        }
    }

    //closes newsletter dialog
    const handleNewsletterClose = () => {
        setOpen(false);
    }

    //opens newsletter dialog
    const handleNewsletterOpen = () => {
        setOpen(true);
    };

    //Handles change in email textfield but debounce prevents it from updating too often. Reset any errors.
    const handleEmailChange = debounce ((tempEmail) => {
        setEmail(tempEmail);
        setErrorText("");
        setIsError(false);
    }, 500);

    //Disables keyboard navigation of menu so that the TextField can be typed in properly
    const stopPropagation = e => {
                e.stopPropagation();
    };

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
                    <MenuItem onClick={handleNewsletterOpen}>Newsletter</MenuItem>
                    <Dialog open = {open}>
                        <DialogTitle>Join Our Newsletter</DialogTitle>
                        <DialogContent>
                            <DialogContentText id='alert-dialog-slide-description'>
                                If you would like to receive our newsletter please enter your email.
                            </DialogContentText>
                            <TextField error={isError} helperText={errorText} label='Email' onKeyDown={stopPropagation} fullWidth variant='outlined' required onChange={e => handleEmailChange(e.target.value)}/>
                        </DialogContent>
                        <DialogActions>
                            <Button variant='contained' color='primary' onClick = {event => handleNewsletterClose()}>Cancel</Button>
                            <Button variant='contained' color='primary' onClick = {event => handleSubmit(event)}>Submit</Button>
                        </DialogActions>
                    </Dialog>
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
