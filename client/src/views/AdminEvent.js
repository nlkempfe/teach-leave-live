import React, { useState } from 'react';
import {debounce} from 'lodash';

/* Import assets */
import logo from '../assets/logo.png'

/* Import material-UI components */
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

/* Import custom components */
import NavigationBar from '../components/NavigationBar.js';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

function AdminEvent() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
    const [selectedName, setSelectedName] = useState("");
    const [selectedDescription, setSelectedDescription] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedZip, setSelectedZip] = useState(""); 

    const handleDateChange = date => {
      setSelectedDate(date.target);
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

    const handleSubmit = event => {
      event.preventDefault();
    };

  return (
    <div>
        <div>
          <NavigationBar/>
        </div>
        <div>
          <Container maxWidth="md">
              <Grid container direction="row" justify="center" alignItems="flex-start">
                <h2>Create an Event</h2>
              </Grid>
                <form className={classes.root} onSubmit={handleSubmit}>                      
                  <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                     <TextField id="outlined-full-width" label="Event Name" fullWidth variant="outlined" required onChange={e => handleNameChange(e.target.value)}/>
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
                      <TextField id="outlined-basic" label="Address" fullWidth variant="outlined" required onChange={e => handleAddressChange(e.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField id="outlined-basic" label="City" fullWidth variant="outlined" required onChange={e => handleCityChange(e.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField id="outlined-basic" label="State" fullWidth variant="outlined" required onChange={e => handleStateChange(e.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField id="outlined-basic" label="Zip" fullWidth variant="outlined" required onChange={e => handleZipChange(e.target.value)}/>
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
          </Container>
        </div>
    </div>
  );
}

export default AdminEvent;