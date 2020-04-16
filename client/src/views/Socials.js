import React, { useState, useEffect } from 'react';
import {Grid, Paper} from "@material-ui/core";
import {db} from '../firebase/firebaseInit';

import SocialsCalendar from '../components/SocialsCalenderNew.js'
import SocialsEvent from '../components/SocialsEvent.js'

function Socials(props) {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([])
  useEffect(() => {
    db.collection('events').get().then(querySnapshot => {
      let tempEvents = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        let event = {
            name: data.name,
            description: data.description,
            dateAndTime: new Date(data.dateAndTime.seconds * 1000),
            address: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip
        }
        tempEvents.push(event);
      });
      setEvents(tempEvents);
    });
  }, []);

  return (
    <Grid container spacing={3} style={{'flexGrow': 1, 'padding': 10}}>
      <Grid item xs={12}>
        <h1 style={{"textAlign" : "center"}}>Upcoming Events</h1>
      </Grid>
      <Grid item xs={12}>
        <h1 style={{"textAlign" : "center"}}>Search bar here</h1>
      </Grid>
      <Grid item>
        <SocialsCalendar date={date} setDate={setDate} events={events}/>
      </Grid>
      <Grid item>
        <SocialsEvent date={date} events={events}/>
      </Grid>
    </Grid>
  );
}

export default Socials;
