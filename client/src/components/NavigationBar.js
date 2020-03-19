import React, { useState } from 'react';

/* Import assets */
import PersonFillIcon from '../assets/icons/person-fill.svg';

/* Import bootstrap components */
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';import StripeCheckout from '../components/StripeCheckout'

function NavigationBar () {
  return (
    <div>
      <Navbar bg = "dark" fixed = "top" variant = "dark">
        <Navbar.Brand>
          Teach Leave Live
        </Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse className = "justify-content-end" variant = "dark">
            <Nav.Link href = "/home">Home</Nav.Link>
            <Nav.Link href = "/blog">Blog</Nav.Link>
            <Nav.Link href = "/checkout">Checkout</Nav.Link>
            <Nav.Link>Courses</Nav.Link>
            <Nav.Link>
              <Image src = {PersonFillIcon}/>
              {' Account'}
            </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
