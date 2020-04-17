import React, { useState } from 'react';
import {Avatar, Container, Card, CardContent, Typography, Grid, Button} from '@material-ui/core'
import ProfileLink from '../components/ProfileLink.js'
import logo from '../assets/logo.png';
import image from '../assets/BlogImg.png';
import { CenturyView } from 'react-calendar';
import { createMuiTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
function Blog() {
  const styles = {
    paperContainer: {
        flexGrow:1,
        backgroundImage: `url(${image})`,
        height : 220,
        backgroundRepeat: "no-Repeat",
        width: '175vh',
    }
};
  let userID = 'a2c60dovnNajfSG91rnB4UXmBlf2'
  return (
    <div>
      <Grid container spacing={1} >
      <Grid item >
      <Box style={styles.paperContainer} bgcolor="text.secondary" color="background.paper" p={1} textAlign='center'>
        yeet
        </Box>
      </Grid>
      </Grid>
      <h1>Add a post</h1>
      <p>
      Create a post to help your fellow teachers or just to express your concerns.
      </p>
     <Button variant="contained" color = "primary">+</Button>
     <br/>
     <br/>
     <br/>
     <h1>Discussions</h1>
    </div>
  );
}
//<div><ProfileLink uid={userID}/></div>
export default Blog;