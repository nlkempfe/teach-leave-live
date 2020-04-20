import React, { useState, useEffect } from 'react';
import {Grid, Paper, TextField, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";
import {db} from '../firebase/firebaseInit';
import {readUser, updateEvent} from '../firebase/controllers.js';

import SocialsCalendar from '../components/SocialsCalender.js';
import SocialsEvent from '../components/SocialsEvent.js';

function sameDay(date1, date2){
  return (
    date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  );
}

function Socials(props) {
  const [date, setDate] = useState(new Date()); //now
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [clickedEvent, setClickedEvent] = useState(undefined);
  const [popUpResult, setPopUpResult] = useState('');
  useEffect(() => {
    db.collection('events').get().then(querySnapshot => {
      let tempEvents = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        let event = {
            id: doc.id,
            name: data.name,
            description: data.description.join(''),
            dateAndTime: new Date(data.dateAndTime.seconds * 1000),
            address: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip,
            attendees: (data.attendees ? data.attendees : [])
        }
        tempEvents.push(event);
      });
      setEvents(tempEvents);
    });
  }, []);

  let eventComponents = [];
  const addEvent = (event) => {
    eventComponents.push(
      <Grid item>
        <Button block variant="contained" style={{'textTransform': 'none'}}
        onClick={() => {
          setClickedEvent(event);
          setDate(event.dateAndTime);
        }}>
          <SocialsEvent event={event}/>
        </Button>
      </Grid>
    );
  };
  for(let i = 0; i < events.length; i++){
    if(sameDay(events[i].dateAndTime, date)){
      addEvent(events[i]);
    }
  }
  if(search){
    for(let i = 0; i < events.length; i++){
      if(events[i].name.toLowerCase().includes(search.toLowerCase())){
          if(!sameDay(events[i].dateAndTime, date)){
            addEvent(events[i]);
          }
      }
    }
  }

  return (
    <div>
    <Grid container
      spacing={3}
      justify="center"
      style={{'flexGrow': 1, 'margin': 0, 'width': '100%'}}
    >
      <Grid item onClick={()=>{setSearch('')}}>
        <SocialsCalendar date={date} setDate={setDate} events={events}/>
      </Grid>
      <Grid item>
        <Grid container
          spacing={3}
          direction="column"
          alignItems="flex-start"
        >
          <Grid item>
            <TextField label="Search Events" variant="outlined" onChange={e => {
              setSearch(e.target.value);
            }}/>
          </Grid>
          {eventComponents}
        </Grid>
      </Grid>
      <Grid item>
        {clickedEvent ?
          <Paper>
            <Grid container
              direction="column"
              alignItems="flex-start"
            >
              <Grid item>
                <SocialsEvent event={clickedEvent} expanded={true}/>
              </Grid>
              <Grid item>
                <Button variant="contained" style={{'margin': 10}}
                  onClick={() => {
                    const user = readUser();

                    if(!user){
                      setPopUpResult('You are not logged in.');
                    }else if(!clickedEvent.attendees.includes(user.uid)){
                      clickedEvent.attendees.push(user.uid);
                      updateEvent(clickedEvent.id, {attendees: clickedEvent.attendees});
                      setPopUpResult('You have been added successfully.');
                    }else{
                      setPopUpResult('You were added already.');
                    }
                  }}
                >
                  RSVP
                </Button>
                {'Attendees: ' + clickedEvent.attendees.length}
              </Grid>
            </Grid>
          </Paper>
        : undefined }
      </Grid>
    </Grid>
    <Dialog
        open={popUpResult}
        onClose={() => setPopUpResult('')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"RSVP"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {popUpResult}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopUpResult('')} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Socials;
