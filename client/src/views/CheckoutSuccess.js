import React, { useEffect } from "react";
import Axios from 'axios';
import {readUser, updateUser} from "../firebase/controllers";
import { useHistory } from "react-router-dom";
// export default class App extends React.Component {
  const App = () => {
    const history = useHistory();
    useEffect(()  => {
      setTimeout(() => history.push('/account'), 30);
    }
    , []);

    useEffect(()  => {
      let user = readUser();
      console.log(user);
      let updatedValues = {premium: true};
      updateUser(user.uid, updatedValues)
    }
    , []);
  // componenetDidMount(){

//     // import {readUser, updateUser} from "../firebase/controllers";
// // Read the user from the browser's localStorage
// let user = readUser();
// console.log(user);s
// // Create an object representing the fields of the document you want to update
// let user = readUser();
// // Update the document with the function from controllers.js
// updateUser(user.uid, updatedValues)
//     //
//     /************** Post request to firebase. Changing user to from free to paid **************/
//     //
//     // axios.post('/newSubscriber', {
//     //  user: this.props.currUser
//     // })
//     setTimeout(this.props.history.push('/'), 5000)
  // }

  // render() {
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
// }
export default App;