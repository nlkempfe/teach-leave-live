import React from "react";
import Axios from 'axios';

export default class App extends React.Component {
  componenetDidMount(){
    //
    /************** Post request to firebase. Changing user to from free to paid **************/
    //
    //axios.post('/newSubscriber', {
    //  user: this.props.currUser
    //})
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
