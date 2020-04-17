import React, { useState } from 'react';
/* Import assets */
import logo from '../assets/logo.png';
import classroom from "../assets/c1.jpg";
import { CenturyView } from 'react-calendar';

import { createMuiTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

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
    
};

  return (
    
    <div style={styles.paperContainer} height = "max" width = "max">
      
      <Box bgcolor="text.disabled" color="background.paper" p={1}>
        <h1>Teach. Leave. Live.</h1>
          
          <p align = "center">
        "We are the bridge between the classroom and personal lives of the teachers" 
      </p>
        </Box>
        
    </div>
  );
}
export default Home;