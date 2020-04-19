import React from 'react';
import {Paper, Grid, Typography, Collapse, Badge} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';




const dateTimeFormatOptions = {weekday: "long", year: "numeric", month: "short", day: "numeric", hour: '2-digit', minute: '2-digit', timeZoneName: 'short'};

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
    <Grid container
      spacing={3}
      direction="column"
      alignItems="flex-start"
      style={{'flexGrow': 1, 'margin': 3}}
    >
      <Grid item>
        <Typography>
          {props.event.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          {props.event.dateAndTime.toLocaleDateString('en-US', dateTimeFormatOptions)}
        </Typography>
      </Grid>
      {props.expanded ?
        <Grid item>
          <Typography>
            {formatAddress(props.event)}
          </Typography>
        </Grid>
      : undefined}
      {props.expanded ?
        <Grid item>
          <Typography style={{'maxWidth': 300}}>
            {props.event.description}
          </Typography>
        </Grid>
      : undefined}
    </Grid>
  )
}

export default SocialsEvent;
