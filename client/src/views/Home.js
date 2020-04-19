import React, { useState } from 'react';

/* Import assets */
import logo from '../assets/logo.png';
import classroom from '../assets/classroom.jpg';

/* Import material-ui components */
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

/* Import custom components */
import NewsletterSubscribeButton from '../components/NewsletterSubscribeButton';

function Home(props) {

  return (
    <div style={{margin: 'auto', textAlign: 'center', backgroundImage: `url(${classroom})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover',  height: '100vh'}}>
      <Container fluid style = {{paddingTop: '10%'}}>
        <Typography variant= 'h1' gutterBottom >Teach. Leave. Live.</Typography>
        <Typography variant= 'subtitle1' color = 'primary.contrastText' gutterBottom >We are the bridge between the classroom and personal lives of the teachers.</Typography>
        <NewsletterSubscribeButton open = {true}/>
      </Container>
    </div>
  );
}
export default Home;
