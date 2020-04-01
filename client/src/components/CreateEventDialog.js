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
import TextField from '@material-ui/core/TextField';

/* Import material-ui-pickers components */
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

function CreateEventDialog(props) {
    const classes = useStyles();
    let currentDate = Date.now().toString();
    /* Hook for the value of each form */
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedName, setSelectedName] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedZip, setSelectedZip] = useState('');

    //Splits description into an array of strings since firebase only allows strings of 99 characters or less
    function makeDescriptionArray(eventDescription) {
        let count = 0;
        let i = 0;
        for(i; i < Math.ceil(selectedDescription.length/99) - 1; i++)
        {
            eventDescription[i] = selectedDescription.substring(count, count + 98);
            count += 99;
        }
        console.log(i);
        eventDescription[i] = selectedDescription.substring(count);
    }

    /* Handle changes of the value of each form using debounce to improve performance*/
    const handleDateChange = date => {
      setSelectedDate(date);
    };
    const handleNameChange = debounce ((name) => {
      setSelectedName(name);
    }, 500);
    const handleDescriptionChange = debounce ((description) => {
      setSelectedDescription(description);
    }, 500);
    const handleAddressChange = debounce ((address) => {
      setSelectedAddress(address);
    }, 500);
    const handleCityChange = debounce ((city) => {
      setSelectedCity(city);
    }, 500);
    const handleStateChange = debounce ((state) => {
      setSelectedState(state);
    }, 500);
    const handleZipChange = debounce ((zip) => {
      setSelectedZip(zip);
    }, 500);

    //Adds event to database after submission of form
    const handleSubmit = (event) => {
      console.log('called');
      currentDate = selectedDate;
      let eventDescription = new Array(Math.ceil(selectedDescription.length/99));
      makeDescriptionArray(eventDescription);
      let doc = db.collection('events').add({
          name : selectedName,
          address : selectedAddress,
          city : selectedCity,
          state : selectedState,
          zip : selectedZip,
          description : eventDescription,
          dateAndTime : currentDate
      }).then(props.handleClose());
    };

  return (
    <Dialog open = {props.open}>
      <DialogTitle>Create Event</DialogTitle>
        <DialogContent className = {classes.root}>
          <TextField label='Event Name' fullWidth variant='outlined' required inputProps={{maxLength: 99}} onChange={e => handleNameChange(e.target.value)}/>
          <TextField label='Event Description' multiline required fullWidth rows='4' variant='outlined' onChange={e => handleDescriptionChange(e.target.value)}/>
          <TextField label='Address' fullWidth variant='outlined' required inputProps={{maxLength: 99}} onChange={e => handleAddressChange(e.target.value)}/>
          <TextField label='City' fullWidth variant='outlined' required inputProps={{maxLength: 99}} onChange={e => handleCityChange(e.target.value)}/>
          <TextField label='State' fullWidth variant='outlined' required inputProps={{maxLength: 99}} onChange={e => handleStateChange(e.target.value)}/>
          <TextField label='Zip' fullWidth variant='outlined' required inputProps={{maxLength: 99}} onChange={e => handleZipChange(e.target.value)}/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify='center' spacing={1}>
            <Grid item>
              <KeyboardDatePicker disableToolbar fullWidth required variant='inline' format='MM/dd/yyyy' margin='normal' label='Event Date' value={selectedDate} onChange={handleDateChange} KeyboardButtonProps={{'aria-label': 'change date',}}/>
            </Grid>
            <Grid item>
              <KeyboardTimePicker fullWidth required margin='normal' label='Event Time' value={selectedDate} onChange={handleDateChange} KeyboardButtonProps={{'aria-label': 'change time',}}/>
            </Grid>
          </Grid>
          </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='primary' onClick = {event => props.handleClose()}>Cancel</Button>
        <Button variant='contained' color='primary' onClick = {event => handleSubmit(event)}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateEventDialog;
