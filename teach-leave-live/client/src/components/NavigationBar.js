import React, { useState } from 'react';

/* Import assets */
import LogoLight from '../assets/logo_light.png'
import BookMark from '../assets/icons/bookmark.svg'

/* Import bootstrap components */
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

function NavigationBar () {
    return (
        <div>
            <Navbar bg = "light" fixed = "top" variant = "light">
                <Navbar.Collapse className = "justify-content-between">
                    <Image src = {LogoLight} fluid />
                    <Form>
                        <FormControl type="text" placeholder="Search" className="mr-auto" />
                    </Form>
                    <Nav.Link className = "text-dark">Sign up</Nav.Link>
                    <Nav.Link className = "text-dark">Login</Nav.Link>
                    <Nav.Link className = "text-dark">Classroom</Nav.Link>
                    <Image src = {BookMark} fluid/>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavigationBar;
