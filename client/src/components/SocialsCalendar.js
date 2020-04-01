import React, { useState, useEffect} from 'react';

import {db} from '../firebase/firebaseInit';

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
const dayEquals = (date1, date2) => date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
const dayFormat = new Intl.DateTimeFormat('default', { year: 'numeric', month: 'short', day: '2-digit'})
const timeFormat = new Intl.DateTimeFormat('default', {hour: 'numeric', minute: 'numeric', timeZoneName: 'long'})

function getTileContent(events){
  return ({activeStartDate, date, view}) => {
    for(var i = 0; i < events.length; i++){
      if(events[i].dateAndTime && dayEquals(events[i].dateAndTime.toDate(), date)){
        return <div>*</div>;  //todo put something more meaningful here
      }
    }
    return null;
  }
}

function getEventsOnDay(events, date){
  let results = [];
  for(var i = 0; i < events.length; i++){
    if(events[i].dateAndTime && dayEquals(events[i].dateAndTime.toDate(), date)){
      results.push(
        <div>
          <Typography variant="h5">
            {events[i].name}
          </Typography>
          <Typography>
            {timeFormat.format(events[i].dateAndTime.toDate())}
          </Typography>
          <Typography>
            {events[i].address} {events[i].city}, {events[i].state} {events[i].zip}
          </Typography>
          <Typography paragraph>
            {events[i].description}
          </Typography>
        </div>
      );
    }
  }

  if(results.length === 0){
    results.push(
      <div>
        <Typography>
          There are no events on {dayFormat.format(date)}.
        </Typography>
      </div>
    )
  }
  return results;
}

function SocialsCalendar(props){
  const [clickedDay, setClickedDay] = useState(new Date());
  const onClickDay = (value, event) => setClickedDay(value);

  const [events, setEvents] = useState([]);
  useEffect(() => {
    db.collection('events').get().then(querySnapshot => {
      let tempEvents = [];
      querySnapshot.forEach(doc => {
        let event = {
            name: doc.data().name,
            description: doc.data().description,
            dateAndTime: doc.data().dateAndTime,
            address: doc.data().address,
            city: doc.data().city,
            state: doc.data().state,
            zip: doc.data().zip
        }
        tempEvents.push(event);
      });
      setEvents(tempEvents);
    });
  }, []);

  return (
    <Container>
      <Grid container spacing = {5}>
        <Grid item>
          <Calendar tileContent = {getTileContent(events)} onClickDay = {onClickDay}/>
        </Grid>
        <Grid item xs = {6}>
          <Card>
            <CardContent>
              {getEventsOnDay(events, clickedDay)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SocialsCalendar;
