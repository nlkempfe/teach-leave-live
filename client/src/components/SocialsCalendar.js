import React, { useState } from 'react';

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import Card from '@material-ui/core/card'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
const dateEquals = (date1, date2) => date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();

function getTileContent(tiles){
  return ({activeStartDate, date, view}) => {
    for(var i = 0; i < tiles.length; i++){
      if(dateEquals(tiles[i][0], date)){
        return <p>{tiles[i][1]}</p>;
      }
    }
    return null;
  }
}

const dateToString = (date) => date.getFullYear() + date.getMonth() + date.getDate();

const dateTimeFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})


function SocialsCalendar(props){
  const [clickedDay, setClickedDay] = useState(null);
  const onClickDay = (value, event) => setClickedDay(value);
  const card = clickedDay == null ? null : (
    <Card>
      <CardContent>
        <Typography color="textSecondary">
          {dateTimeFormat.format(clickedDay)}
        </Typography>
        <Typography>
          Events:
        </Typography>
        <Typography>
          Sample event
        </Typography>
      </CardContent>
    </Card>
  )

  return (
    <Container>
      <Grid container spacing = {5}>
        <Grid item>
          <Calendar tileContent = {props.tiles ? getTileContent(props.tiles) : null} onClickDay = {onClickDay}/>
        </Grid>
        <Grid item>
          {card}
        </Grid>
      </Grid>
    </Container>
  )
}

export default SocialsCalendar;
