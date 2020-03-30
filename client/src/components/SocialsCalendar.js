import React, { useState } from 'react';

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import Card from '@material-ui/core/card'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import {getAllEvents} from '../firebase/controllers.js'

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
const dayEquals = (date1, date2) => date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
const dayFormat = new Intl.DateTimeFormat('default', { year: 'numeric', month: 'short', day: '2-digit'})
const timeFormat = new Intl.DateTimeFormat('default', {hour: 'numeric', minute: 'numeric', timeZoneName: 'long'})

function getTileContent(events){
  return ({activeStartDate, date, view}) => {
    for(var i = 0; i < events.length; i++){
      if(dayEquals(events[i].get('dateAndTime').toDate(), date)){
        return <div>*</div>;  //todo put something more meaningful here
      }
    }
    return null;
  }
}

function getEventsOnDay(events, date){
  let results = [];
  for(var i = 0; i < events.length; i++){
    if(dayEquals(events[i].get('dateAndTime').toDate(), date)){
      results.push(
        <div>
          <Typography variant="h5">
            {events[i].get('name')}
          </Typography>
          <Typography>
            {timeFormat.format(events[i].get('dateAndTime').toDate())}
          </Typography>
          <Typography>
            {events[i].get('address')} {events[i].get('city')}, {events[i].get('state')} {events[i].get('zip')}
          </Typography>
          <Typography paragraph>
            {events[i].get('description')}
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
  const [clickedDay, setClickedDay] = useState(null);
  const onClickDay = (value, event) => setClickedDay(value);

  const [events, setEvents] = useState([]);
  if(events.length === 0){
    getAllEvents((docs) => setEvents(docs));
  }

  const card = clickedDay == null ? null : (
    <Card>
      <CardContent>
        {getEventsOnDay(events, clickedDay)}
      </CardContent>
    </Card>
  )

  return (
    <Container>
      <Grid container spacing = {5}>
        <Grid item>
          <Calendar tileContent = {getTileContent(events)} onClickDay = {onClickDay}/>
        </Grid>
        <Grid item xs = {6}>
          {card}
        </Grid>
      </Grid>
    </Container>
  )
}

export default SocialsCalendar;
