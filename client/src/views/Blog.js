import React, { useState } from 'react';
import {Avatar, Container, Card, CardContent, Typography, Grid, Button} from '@material-ui/core'
import ProfileLink from '../components/ProfileLink.js'
function Blog() {
  let userID = 'a2c60dovnNajfSG91rnB4UXmBlf2'
  return (
    <div>
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