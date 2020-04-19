import React, { useState } from 'react';
import {Avatar, Container, Card, CardContent, Typography, Grid, Button} from '@material-ui/core'
import ProfileLink from '../components/ProfileLink.js'
import logo from '../assets/logo.png';
import image from '../assets/BlogImg.png';
import { CenturyView } from 'react-calendar';
import { createMuiTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
function Blog() {
  const styles = {
    paperContainer: {
        flexGrow:1,
        backgroundImage: `url(${image})`,
        height : 220,
        backgroundRepeat: "no-Repeat"
    },
    card: {
      flexGrow: 1,
      width: '25vh',
      height: '25vh',
      paddingTop: 'auto', // 16:9,
      marginTop:'10'
    }
};
  return (
    <div>
      <Grid container spacing={0} justify='flex-start'>
      <Grid item xs={6} sm={3}>
      <Box style={styles.paperContainer} bgcolor="text.primary" color="background.paper">
        </Box>
      </Grid>
      <Grid item xs={12} sm={9}>
      <Box bgcolor="text.primary" color="background.paper" p={8.9} align = "center">
      <h1> Blog Forum</h1>
       </Box> 
      </Grid>
      </Grid>
      <br/>
      <br/>
      <h1>Add a post</h1>
      <p>
      Create a post to help your fellow teachers or just to express your concerns.
      </p>
     <Button variant="contained" color = "primary">+</Button>
     <br/>
     <br/>
     <br/>
     <h1>Discussions</h1>
     <form noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Search for discussion" variant="outlined" />
    </form>
    <br/>
    <Grid container spacing={4} justify='flex-start'>
    <Grid item xs={6} sm={3}>
     <Card>
       <CardActionArea>
         <CardMedia component="img" alt = "Teach.Leave.Live" style={styles.card} image={require('../assets/logo.png')} title = "test">
           </CardMedia>
           <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
            Teach.Leave.Live
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            TEST
          </Typography>
           </CardContent>
         </CardActionArea>
         <CardActions>
         <Button size="small" color="primary">
          See More
        </Button>
           </CardActions>
       </Card>
    </Grid>
    <Grid item xs={6} sm={3}>
     <Card>
       <CardActionArea>
         <CardMedia component="img" alt = "Teach.Leave.Live" style={styles.card} image={require('../assets/logo.png')} title = "test">
           </CardMedia>
           <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
            Teach.Leave.Live
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            TEST
          </Typography>
           </CardContent>
         </CardActionArea>
         <CardActions>
         <Button size="small" color="primary">
          See More
        </Button>
           </CardActions>
       </Card>
    </Grid>
    <Grid item xs={6} sm={3}>
     <Card>
       <CardActionArea>
         <CardMedia component="img" alt = "Teach.Leave.Live" style={styles.card} image={require('../assets/logo.png')} title = "test">
           </CardMedia>
           <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
            Teach.Leave.Live
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            TEST
          </Typography>
           </CardContent>
         </CardActionArea>
         <CardActions>
         <Button size="small" color="primary">
          See More
        </Button>
           </CardActions>
       </Card>
    </Grid>
    <Grid item xs={6} sm={3}>
     <Card>
       <CardActionArea>
         <CardMedia component="img" alt = "Teach.Leave.Live" style={styles.card} image={require('../assets/logo.png')} title = "test">
           </CardMedia>
           <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
            Teach.Leave.Live
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            TEST
          </Typography>
           </CardContent>
         </CardActionArea>
         <CardActions>
         <Button size="small" color="primary">
          See More
        </Button>
           </CardActions>
       </Card>
    </Grid>
    <Grid item xs={6} sm={3}>
     <Card>
       <CardActionArea>
         <CardMedia component="img" alt = "Teach.Leave.Live" style={styles.card} image={require('../assets/logo.png')} title = "test">
           </CardMedia>
           <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
            Teach.Leave.Live
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            TEST
          </Typography>
           </CardContent>
         </CardActionArea>
         <CardActions>
         <Button size="small" color="primary">
          See More
        </Button>
           </CardActions>
       </Card>
    </Grid>
    </Grid>
    </div>
  );
}
//<div><ProfileLink uid={userID}/></div>
export default Blog;