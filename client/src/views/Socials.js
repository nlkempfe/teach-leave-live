import React, { useState } from 'react';
import SocialsCalendar from '../components/SocialsCalendar.js'
import { Tracker } from 'react-tracker';

const tracker = new Tracker();
function Socials(props) {
  return (
    <div>
      <h1>
        Upcoming Events
      </h1>
      <SocialsCalendar />
    </div>
  );
}

export default Socials;
