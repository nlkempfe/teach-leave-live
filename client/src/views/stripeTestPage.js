import React from 'react';
import Axios from 'axios';

export default class App extends React.Component {
  stripeRouter = () => {
    Axios.get('/stripe').then((val) => {

    })
  }

  render() {
    
    return (
      <div >
          <button onClick={() => this.stripeRouter()}>Stripe</button>
      </div>
    )
  }
}
