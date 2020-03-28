import React, { useState } from 'react';

/* Import assets */
import logo from '../assets/logo.png'
import ImageIcon from '../assets/icons/image.svg';

/* Import bootstrap components */
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

/* Import custom components */
import NavigationBar from '../components/NavigationBar.js';
//

function Home() {
  return (
    <div>
      <NavigationBar/>
      <Jumbotron fluid variant = "dark">
        <Container fluid style = {{padding: "50px"}} variant = "dark">
          <Row>
            <Col>
              <Image src = {ImageIcon} style = {{width: "50%"}}/>
            </Col>
            <Col>
              <h1 style = {{textAlign: "center"}}>Lorem ipsum</h1>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor nibh, fermentum porttitor pulvinar sed, lacinia a lorem. Sed iaculis augue vel dictum rhoncus. Suspendisse venenatis, tellus nec sollicitudin molestie, urna felis semper mi, vitae laoreet nulla mi rhoncus risus. Ut dictum mauris nec ornare fermentum. Donec vulputate felis in vestibulum fermentum. Etiam varius varius nunc sed pharetra. In in est libero. Aenean auctor at ante eu scelerisque. Vestibulum vitae convallis mauris. Nam risus nibh, pellentesque a lacus eget, accumsan ultricies arcu. Phasellus finibus risus a velit dapibus, eget laoreet erat maximus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris varius volutpat luctus. Integer tincidunt feugiat justo. Phasellus eu sem urna. Pellentesque eget vehicula enim.
              </p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default Home;
