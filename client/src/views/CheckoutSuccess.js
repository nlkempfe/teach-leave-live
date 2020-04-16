import React from "react";
import Axios from 'axios';
import {readUser, updateUser} from "../firebase/controllers";
export default class App extends React.Component {
  componenetDidMount(){

    // import {readUser, updateUser} from "../firebase/controllers";
// Read the user from the browser's localStorage
let user = readUser();
// Create an object representing the fields of the document you want to update
let updatedValues = {premium: true};
// Update the document with the function from controllers.js
updateUser(user.uid, updatedValues)
    //
    /************** Post request to firebase. Changing user to from free to paid **************/
    //
    // axios.post('/newSubscriber', {
    //  user: this.props.currUser
    // })
    setTimeout(this.props.history.push('/'), 5000)
  }

  render() {
    return (
      <div style={{marginTop: 100}}>
        <div style={{textAlign: 'center'}}>
          Thank you for subscribing. 
        </div>
        <div style={{textAlign: 'center'}}>
          Your account has now been upgraded to premium.
        </div>
        <div style={{textAlign: 'center'}}>
          You will be redirected to the home page.
        </div>
      </div>
    )
  }
}
