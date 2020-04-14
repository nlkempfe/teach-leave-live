const express = require('express');
const path = require('path');
const stripe = require('stripe')('sk_test_gPRWNEFMlzIFuR91AINluLwl00QJys9vNr');
const app = express();

console.log(path.join(__dirname, './client/build'));
/* Serve static files from the React app */
app.use(express.static(path.join(__dirname, './client/build')));

/*
 * The "catchall" handler: for any request that doesn't
 * match one above, send back React's index.html file.
 */
app.get('/stripe',( async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url: 'https://devops-teach-leave-live.herokuapp.com/checkout/success',
    cancel_url: 'https://devops-teach-leave-live.herokuapp.com/checkout/cancel',
    payment_method_types: ['card'],
    line_items: [
      {
        name: 'Premium Subscription',
        //description: 'Subscription',
        amount: 1000,
        currency: 'usd',
        quantity: 1,
      },
    ]
  })

  res.json(session)
}));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);


 const router = require('express').Router(),
   stripe = require('stripe')(process.env.STRIPE_URI || require('../config').stripe.uri);



// module.exports = router;
//https://devops-teach-leave-live.herokuapp.com