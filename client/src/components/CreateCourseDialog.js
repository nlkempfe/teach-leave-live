import React, { useState } from 'react';
import {debounce} from 'lodash';

/* Import custom components */

/* Import firebase products */
import {db} from '../firebase/firebaseInit';

/* Import material-UI components */
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

function CreateCourseDialog(props) {
    const classes = useStyles();

    /* Hook for the value of each form */
    const [selectedName, setSelectedName] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedLink, setSelectedLink] = useState('');
    const [selectedSubscription, setSelectedSubscription] = useState(false);

    /* Handle changes of the value of each form using debounce to improve performance*/
    const handleNameChange = debounce ((name) => {
      setSelectedName(name);
    }, 500);
    const handleDescriptionChange = debounce ((description) => {
      setSelectedDescription(description);
    }, 500);
    const handleLinkChange = debounce ((link) => {
      setSelectedLink(link);
    }, 500);
    const handleSubscriptionChange = debounce ((subscription) => {
      setSelectedSubscription(subscription);
    }, 500);

    //Adds course to database after submission of form
    const handleSubmit = (course) => {
      let doc = db.collection('courses').add({
          name : selectedName,
          description : selectedDescription,
          link: selectedLink,
          premium: selectedSubscription,
          views: 0
      }).then(props.handleClose());
    };

  return (
    <Dialog open = {props.open}>
      <DialogTitle>Create Course</DialogTitle>
        <DialogContent className = {classes.root}>
          <TextField className = {classes.root} label='Course Name' fullWidth variant='outlined' required inputProps={{maxLength: 99}} onChange={e => handleNameChange(e.target.value)}/>
          <TextField className = {classes.root} label='Course Description' multiline required fullWidth rows='4' variant='outlined' onChange={e => handleDescriptionChange(e.target.value)}/>
          <TextField className = {classes.root} label='Link' fullWidth variant='outlined' required inputProps={{maxLength: 99}} onChange={e => handleLinkChange(e.target.value)}/>
          <InputLabel className = {classes.root}>Subscription Plan</InputLabel>
          <Select className = {classes.root} variant = 'outlined' value = {selectedSubscription} onChange = {event => handleSubscriptionChange(event.target.value)}>
            <MenuItem value = {true}>Premium</MenuItem>
            <MenuItem value = {false}>Free</MenuItem>
          </Select>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='primary' onClick = {course => props.handleClose()}>Cancel</Button>
        <Button variant='contained' color='primary' onClick = {course => handleSubmit(course)}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateCourseDialog;
