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
import Slide from '@material-ui/core/Slide';

/* Import firebase products */
import {auth, provider, db} from "../firebase/firebaseInit";
  
  function ProfileLink(props) {
    const [open, setOpen] = useState(false);

    let userName = ";"
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    if (props != undefined)
    {
        userName = props.name.toString()
    }

    return (
      <div>
      <Button onClick={handleClickOpen}>{userName}</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{userName}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
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