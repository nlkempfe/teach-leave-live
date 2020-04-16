import React from 'react';
import {Paper, List, ListItem, Typography} from '@material-ui/core';


const timeFormatOptions = {hour: '2-digit', minute: '2-digit', timeZoneName: 'short'};

function formatAddress(event){
  let result = ''
  let join = value => {
    if(result.length > 0){
      result += ' '
    }
    result += value;
  };

  if(event.address){
    join(event.address);
  }
  if(event.city){
    join(event.city);
  }
  if(event.state){
    join(event.state);
  }
  if(event.zip){
    join(event.zip);
  }
  return result;
}

function SocialsEvent(props){
  return(
    <List>
      <ListItem key={0}>
        <Typography>
          {props.event.name}
        </Typography>
      </ListItem>
      <ListItem key={1}>
        <Typography>
          {props.event.dateAndTime.toLocaleTimeString('en-US', timeFormatOptions)}
        </Typography>
      </ListItem>
      <ListItem key={2}>
        <Typography>
          {formatAddress(props.event)}
        </Typography>
      </ListItem>
      <ListItem key={3}>
        <Typography>
          {props.event.description}
        </Typography>
      </ListItem>
    </List>
  )
}

export default SocialsEvent;
