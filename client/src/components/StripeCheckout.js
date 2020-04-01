import React from 'react';
import Axios from 'axios';

var stripe = window.Stripe('pk_test_EAXk2U8zR7fVlKNW9sUoACCl006fPFA1kk');

export default class StripeCheckout extends React.Component {
  stripeRouter = () => {
    Axios.get('/stripe').then((val) => {
      return val.data.id
      }).then((val) => {
        stripe.redirectToCheckout({
          sessionId: val
      }).then(function (result) {
          //result.error.message
      })
    })
  }

  render() {
    
    return (
      <div >
          <button onClick={() => this.stripeRouter()}>Stripe Checkout</button>
      </div>
    )
  }
}
