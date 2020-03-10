import React, { useState } from 'react';

/* Import assets */
import PersonFillIcon from '../assets/icons/person-fill.svg';

/* Import bootstrap components */
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

/* Import custom components */
import AuthButton from "./AuthButton";

function NavigationBar (props) {
  return (
    <div>
      <Navbar bg = "dark" fixed = "top" variant = "dark">
        <Navbar.Brand>
          Teach Leave Live
        </Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse className = "justify-content-end" variant = "dark">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Blog</Nav.Link>
            <Nav.Link>Courses</Nav.Link>
            <Nav.Link>
                <AuthButton updateUser={props.updateUser} user={props.user}/>
            </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
