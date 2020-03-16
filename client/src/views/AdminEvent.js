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

function AdminEvent() {
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
              <h1 style = {{textAlign: "center"}}>Create an Event</h1>
              <form>
                <div class="form-group">
                    <label for="eventName">Event Name</label>
                    <input type="text" class="form-control" id="eventName" placeholder="Event Name" required="true"></input>
                </div>
                <div class="form-group">
                    <label for="eventDescription">Event Description</label>
                    <textarea rows="3" class="form-control" id="eventDescription" placeholder="Description" required="true"></textarea>
                </div>
                <div class="form-group">
                    <label for="eventAddress">Street Address</label>
                    <input type="text" class="form-control" id="eventAddress" placeholder="Address" required="true"></input>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="eventCity">City</label>
                        <input type="text" class="form-control" id="eventCity" placeholder="City" required="true"></input>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="eventState">State</label>
                        <select class="form-control" id="eventState" required="true">
                        <option value=""></option>
                            <option>Alaska</option>
                            <option>Alabama</option>
                            <option>Arkansas</option>
                            <option>Arizona</option>
                            <option>California</option>
                            <option>Colorado</option>
                            <option>Connecticut</option>
                            <option>District of Columbia</option>
                            <option>Delaware</option>
                            <option>Florida</option>
                            <option>Georgia</option>
                            <option>Hawaii</option>
                            <option>Iowa</option>
                            <option>Idaho</option>
                            <option>Illinois</option>
                            <option>Indiana</option>
                            <option>Kansas</option>
                            <option>Kentucky</option>
                            <option>Louisiana</option>
                            <option>Massachusetts</option>
                            <option>Maryland</option>
                            <option>Maine</option>
                            <option>Michigan</option>
                            <option>Minnesota</option>
                            <option>Missouri</option>
                            <option>Mississippi</option>
                            <option>Montana</option>
                            <option>North Carolina</option>
                            <option>North Dakota</option>
                            <option>Nebraska</option>
                            <option>New Hampshire</option>
                            <option>New Jersey</option>
                            <option>New Mexico</option>
                            <option>Nevada</option>
                            <option>New York</option>
                            <option>Ohio</option>
                            <option>Oklahoma</option>
                            <option>Oregon</option>
                            <option>Pennsylvania</option>
                            <option>Puerto Rico</option>
                            <option>Rhode Island</option>
                            <option>South Carolina</option>
                            <option>South Dakota</option>
                            <option>Tennessee</option>
                            <option>Texas</option>
                            <option>Utah</option>
                            <option>Virginia</option>
                            <option>Vermont</option>
                            <option>Washington</option>
                            <option>Wisconsin</option>
                            <option>West Virginia</option>
                            <option>Wyoming</option>
                        </select>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="eventZip">Zip</label>
                        <input type="text" class="form-control" id="eventZip" placeholder="Zip" required="true"></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="eventDate">Date</label>
                        <input type="date" class="form-control" id="eventDate" required="true"></input>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="eventTime">Time</label>
                        <input type="time" class="form-control" id="eventTime" required="true"></input>
                    </div>
                </div>
                <div class="form-group">
                    <input class="btn btn-primary" type="submit" value="Submit"></input>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default AdminEvent;