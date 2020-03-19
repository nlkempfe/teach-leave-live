import React, { useState } from 'react';

/* Import assets */
import logo from '../assets/logo.png'

function Home(props) {
  return (
    <div>
      <NavigationBar currUser={props.currUser} updateUser={props.updateUser}/>
    </div>
  );
}

export default Home;
