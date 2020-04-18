import React, { useState } from 'react';
import {Avatar, Container, Card, CardContent, Typography, Grid, Button} from '@material-ui/core'

function Account(props) {

  if(props.currUser === null){
    return null;
  }

  const user = props.currUser;

  return (
    <Card fluid style = {{margin: 20}}>
      <Grid container container spacing={3}>
        <Grid item xs={1}>
          <CardContent>
            <Avatar src={user.picURL} />
          </CardContent>
        </Grid>
        <Grid item xs={10}>
          <CardContent>
            <Typography variant = 'h4'>{user.firstName} {user.lastName}</Typography>
            <Typography variant = 'h6'>{user.email}</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={10}>
          <CardContent>
            {user.premium ? (
              <Typography paragraph>Congratulations! You are a premium user.</Typography>
            ) : (
              <Container>
                <Typography paragraph>You are not a premium user.</Typography>
                <Button variant='contained'>Become a premium user</Button>
              </Container>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Account;
