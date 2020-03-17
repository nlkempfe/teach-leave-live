import React, { useState } from 'react';

/* Import assets */
import logo from '../assets/logo.png'

/* Import custom components */
import NavigationBar from '../components/NavigationBar.js';

function Home(props) {
  return (
    <div>
      <NavigationBar currUser={props.currUser} updateUser={props.updateUser}/>
    </div>
  );
}

export default Home;
