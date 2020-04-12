import React, { useState } from 'react';
import {debounce} from 'lodash';

/* Import assets */
import logo from '../assets/logo.png'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: '100%',
  },
});

function Home(props) {

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isError, setIsError] = useState(false);

  const classes = useStyles();

  //style for div around entire newsletter card
  const newsletterStyle = {
    width: '25%',
    float: 'left'
  }

    /* On submission checks if email is in correct format but not the check is not too extensive
       to prevent users with weird addresses from entering email. Just checking for '@' and '.' mostly.
       If it doesn't match don't submit and create an error on the TextField. Add any functionality upon
       submitting in the if statement*/
       const handleSubmit = () => {
        if (email.match(/\S+@\S+\.\S+/))
        {
            handleNewsletterClose();
        }
        else
        {
            setErrorText('Invalid Email');
            setIsError(true);
        }
    }

    //Handles change in email textfield but debounce prevents it from updating too often. Reset any errors.
    const handleEmailChange = debounce ((tempEmail) => {
        setEmail(tempEmail);
        setErrorText('');
        setIsError(false);
    }, 500);

    //Disables keyboard navigation of menu so that the TextField can be typed in properly
    const stopPropagation = e => {
                e.stopPropagation();
    };


    //closes newsletter dialog
    const handleNewsletterClose = () => {
      setOpen(false);
    }

    //opens newsletter dialog
    const handleNewsletterOpen = () => {
        setOpen(true);
    };

  return (
    <div>
      <div style={newsletterStyle}>
      <Card classname={classes.root}>
          <CardContent>
            <h2>Subscribe To Our Newsletter</h2>
          </CardContent>
          <CardActions>
          <Button color='primary' onClick={handleNewsletterOpen}>Subscribe</Button>
        </CardActions>
      </Card>
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
            <Button variant='contained' color='primary' onClick = {event => handleSubmit()}>Submit</Button>
          </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}

export default Home;
