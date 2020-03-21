import React, { useState } from 'react';
import {debounce} from 'lodash';

/* Import material-UI components */
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

/* Import custom components */
import NavigationBar from '../components/NavigationBar.js';

/* Import firebase products */
import {db} from "../firebase/firebaseInit";

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

function AdminEvent() {
    const classes = useStyles();
    let currentDate = Date.now().toString();
    /* Hook for the value of each form */
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [selectedDescription, setSelectedDescription] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedZip, setSelectedZip] = useState("");

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
    const handleSubmit = event => {
      currentDate = selectedDate;
      let eventDescription = new Array(Math.ceil(selectedDescription.length/99))
      makeDescriptionArray(eventDescription)
      let userDoc = db.collection("events").doc(selectedName);
      let setUserDoc = userDoc.set({
          name : selectedName,
          description : eventDescription,
          address : selectedAddress,
          city : selectedCity,
          state : selectedState,
          zip : selectedZip,
          dateAndTime : currentDate
      });
    };

  return (
    <div>
        <div>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Grid container direction="row" justify="center" alignItems="flex-start">
                <h2>Create an Event</h2>
              </Grid>
                <form className={classes.root} onSubmit={handleSubmit}>
                  <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                     <TextField id="outlined-full-width"
                                label="Event Name"
                                fullWidth
                                variant="outlined"
                                required
                                inputProps={{
                                  maxLength: 99
                                }}
                                onChange={e => handleNameChange(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="outlined-multiline-static"
                                 label="Event Description"
                                 multiline
                                 required
                                 fullWidth
                                 rows="4"
                                 variant="outlined"
                                 onChange={e => handleDescriptionChange(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="outlined-basic"
                                 label="Address"
                                 fullWidth variant="outlined"
                                 required
                                 inputProps={{
                                  maxLength: 99
                                 }}
                                 onChange={e => handleAddressChange(e.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField id="outlined-basic"
                                 label="City"
                                 fullWidth variant="outlined"
                                 required
                                 inputProps={{
                                  maxLength: 99
                                 }}
                                 onChange={e => handleCityChange(e.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField id="outlined-basic"
                                 label="State"
                                 fullWidth
                                 variant="outlined"
                                 required
                                 inputProps={{
                                  maxLength: 99
                                 }}
                                 onChange={e => handleStateChange(e.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField id="outlined-basic"
                                 label="Zip"
                                 fullWidth variant="outlined"
                                 required
                                 inputProps={{
                                  maxLength: 99
                                 }}
                                 onChange={e => handleZipChange(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="center" spacing={2}>
                          <Grid item xs={6}>
                            <KeyboardDatePicker
                              disableToolbar
                              fullWidth
                              required
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              label="Event Date"
                              value={selectedDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <KeyboardTimePicker
                              fullWidth
                              required
                              margin="normal"
                              id="time-picker"
                              label="Event Time"
                              value={selectedDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change time',
                              }}
                            />
                          </Grid>
                        </Grid>
                      </MuiPickersUtilsProvider>
                      <Grid item>
                        <Button variant="contained" color="primary" type="submit">
                          Submit
                        </Button>
                      </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AdminEvent;
