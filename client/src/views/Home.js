import React, { useState } from 'react';
/* Import assets */

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import logo from '../assets/logo.png';
import classroom from "../assets/c1.jpg";

import { CenturyView } from 'react-calendar';
import { createMuiTheme } from '@material-ui/core/styles';


function Home(props) {
  const styles = {
    paperContainer: {
      flexGrow:1,
      backgroundImage: `url(${classroom})`,
      align:CenturyView,
      backgroundRepeat: "no-Repeat",
      height: '100vh',
      textAlign: 'center',
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
  },
  paperContainer2: {
    flexGrow:1,
    height: '83vh',
},
};

  return (
    
    <div style={styles.paperContainer} height = "max" width = "max">
      
      <Box bgcolor="text.disabled" color="background.paper" p={3}>

      <Typography variant="h4" component="h2" gutterBottom>
        Teach. Leave. Live.
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        "We are the bridge between the classroom and personal lives of the teachers" 
      </Typography>
        </Box>
        
        <Box bgcolor="text.disabled" color="background.paper" p={1} style={styles.paperContainer2}>
          
        </Box>
    </div>
  );
}
export default Home;