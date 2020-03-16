import React, { useState } from 'react';

/* Import assets */
import logo from '../assets/logo.png'

/* Import custom components */
import NavigationBar from '../components/NavigationBar.js';

function Home(props) {
  return (
    <div>
      <NavigationBar/>
    </div>
  );
}

export default Home;
