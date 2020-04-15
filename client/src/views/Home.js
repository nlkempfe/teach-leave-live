import React, { useState } from 'react';

/* Import assets */
import logo from '../assets/logo.png'

import Button from '@material-ui/core/Button';

let stripe = window.Stripe('pk_test_EAXk2U8zR7fVlKNW9sUoACCl006fPFA1kk');
function Home(props) {
  return (
    <div>
      <Button onClick={() => {
                        fetch('/stripe')
                            .then(r => r.json())
                            .then(d => {
                                stripe.redirectToCheckout({
                                    sessionId: d.id,
                                }).then(function (result) {
                                    console.log(result);
                                })
                            })      
                    }}>Test</Button>
    </div>
  );
}

export default Home;
