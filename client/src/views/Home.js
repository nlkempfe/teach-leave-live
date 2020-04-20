import React, { useState } from 'react';

/* Import assets */
import logo from '../assets/logo.png';
import classroom from '../assets/classroom.jpg';

/* Import material-ui components */
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

/* Import material-ui icons */
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';


/* Import custom components */
import NewsletterSubscribeButton from '../components/NewsletterSubscribeButton';

function Home(props) {

  return (
    <div style={{margin: 'auto', textAlign: 'center', backgroundImage: `url(${classroom})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover',  height: '100vh'}}>
      <Container fluid style = {{paddingTop: '10%'}}>
        <Typography variant= 'h1' gutterBottom >Teach. Leave. Live.</Typography>
        <Typography variant= 'subtitle1' color = 'primary.contrastText' gutterBottom >We are the bridge between the classroom and personal lives of the teachers.</Typography>
        <Link href="https://www.instagram.com/teachleavelive/" target="_blank" color = 'inherit'><InstagramIcon /> </Link>
        <Link href="#" target="_blank" color = 'inherit'><FacebookIcon /></Link>
        <Link href="#" target="_blank" color = 'inherit'><TwitterIcon /></Link>
        <NewsletterSubscribeButton open = {true}/>
      </Container>
    </div>
  );
}
export default Home;
