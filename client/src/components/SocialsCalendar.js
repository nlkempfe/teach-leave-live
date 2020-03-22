import React, { useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


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


function SocialsCalendar(props){
  return <Calendar tileContent = {props.tiles ? getTileContent(props.tiles) : null} />
}

export default SocialsCalendar;
