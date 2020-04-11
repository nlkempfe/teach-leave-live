import React, { useState } from 'react';
/* Import assets */
import logo from '../assets/logo.png';
import classroom from "../assets/Class.png";
import { CenturyView } from 'react-calendar';
function Home(props) {
  const styles = {
    paperContainer: {
        backgroundImage: `url(${classroom})`,
        align:CenturyView,
        height: 800,
        backgroundRepeat: "no-Repeat"
    }
};
  return (
    <div style={styles.paperContainer}>
      <h1 align = "center" style={{color:"white"}}>
        Teach.Leave.Live
      </h1>
      <br/>
      <p align = "center" style={{color:"white"}}>
        We are the bridge between the classroom and personal lives of the teachers" 
      </p>
    </div>
  );
}
export default Home;