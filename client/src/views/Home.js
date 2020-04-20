import React, { useState } from 'react';
/* Import assets */
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import logo from '../assets/logo.png';
import classroom from "../assets/c1.jpg";
import { CenturyView } from 'react-calendar';
import { createMuiTheme } from '@material-ui/core/styles';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Link from '@material-ui/core/Link';
function Home(props) {
  const styles = {
    paperContainer: {
      flexGrow:1,
      bgcolor : "text.disabled",
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
    <div style={styles.paperContainer} height = "max" width = "max" > 
      <Box bgcolor="text.disabled" color="background.paper" p={3} height = "100vh">
      <Typography variant="h4" component="h2" gutterBottom>
        Teach. Leave. Live.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        "We are the bridge between the classroom and personal lives of the teachers" 
      </Typography>
      <Link href="https://www.instagram.com/teachleavelive/" target="_blank" color = 'inherit'>
      <InstagramIcon /> 
      </Link>
      <Link href="#" target="_blank" color = 'inherit'>
      <FacebookIcon /> 
      </Link>
      <Link href="#" target="_blank" color = 'inherit'>
      <TwitterIcon /> 
      </Link>
        </Box>
    </div>
  );
}
export default Home;