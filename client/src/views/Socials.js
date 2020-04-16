import React, { useState, useEffect } from 'react';
import {Grid, Paper, Typography, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {db} from '../firebase/firebaseInit';

import SocialsCalendar from '../components/SocialsCalenderNew.js'
import SocialsEvent from '../components/SocialsEvent.js'

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

  let eventComponents = [];
  if(search){
    for(let i = 0; i < events.length; i++){
      if(events[i].name.toLowerCase().includes(search.toLowerCase())){
          eventComponents.push(<SocialsEvent event={events[i]} />);
      }
    }
  }else{
    for(let i = 0; i < events.length; i++){
      if(sameDay(events[i].dateAndTime, date)){
        eventComponents.push(<SocialsEvent event={events[i]} />);
      }
    }
  }

  return (
    <Grid container spacing={3} style={{'flexGrow': 1, 'padding': 10}}>
      <Grid item xs={12}>
        <h1 style={{"textAlign" : "center"}}>Upcoming Events</h1>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Search Events" variant="outlined" onChange={e => {
          setSearch(e.target.value);
        }}/>
      </Grid>
      <Grid item onClick={()=>{setSearch('')}}>
        <SocialsCalendar date={date} setDate={setDate} events={events}/>
      </Grid>
      <Grid item>
        {eventComponents.map(component => <Paper style={{'margin': 10}}> {component} </Paper>)}
      </Grid>
    </Grid>
  );
}

export default Socials;
