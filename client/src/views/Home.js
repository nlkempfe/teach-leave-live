import React, { useState } from 'react';

/* Import assets */
import logo from '../assets/logo.png'

import NewsletterSubscribeButton from "../components/NewsletterSubscribeButton";

function Home(props) {


  return (
    <div>
      <NewsletterSubscribeButton/>
    </div>
  );
}

export default Home;
