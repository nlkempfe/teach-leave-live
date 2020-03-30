import React, { useState } from 'react';
import { Fragment } from 'react'
import Parser from 'html-react-parser';

/* Import material-ui components */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

/* Import firebase products */
import {auth, provider, db} from "../firebase/firebaseInit";
  
function ProfileLink(props) {
    //Hold all information about a user
    const [open, setOpen] = useState(false);
    const [buttonName,setButtonName] = useState('')
    const [pictureURL,setPictureURL] = useState('')
    const [email,setEmail] = useState('')
    const [role,setRole] = useState('')
    const [membership,setMembership] = useState(false)
  
    //Handles opening and closing of the Dialog object
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    //Checks the role of the user and returns it to the Dialog object to be displayed
    const checkRole = () => {
      if ((role.localeCompare('user')) === 0)
      {
        return (checkPremium());
      }
      else
      {
       return ("Admin")
      }
    };

    //Returns email of user and nothing if they don't havee a registered email
    const checkEmail = () => {
      if ((email.localeCompare('N/A')) === 0)
      {
        return (null)
      }
      else
      {
       return ("Email: " + email)
      }
    };

    //Returns the membership of the user
    const checkPremium = () => {
      if (membership)
      {
        return ("Premium Member")
      }
      else
      {
       return ("Standard Member")
      }
    };

    //Get information of user from passed in UID and store it in respective variables
    let userRef = db.collection('users').doc(props.uid);
    let getDoc = userRef.get()
    .then(doc => {
      if (!doc.exists)
      {
        console.log('No Such Document')
      }
      else {
        setButtonName(doc.data().firstName + ' ' + doc.data().lastName);
        setPictureURL(doc.data().picURL)
        setEmail(doc.data().email)
        setRole(doc.data().role)
        setMembership(doc.data().premium)
      }
    })

    return (
      <div>
      <Button onClick={handleClickOpen}>{console.log(buttonName)}{buttonName}</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={buttonName} src={pictureURL}></Avatar>
              </ListItemAvatar>
              <ListItemText primary={buttonName}></ListItemText>
            </ListItem>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {checkRole()}<br/>
              {checkEmail()}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Exit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  export default ProfileLink