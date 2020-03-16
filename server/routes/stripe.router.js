const router = require('express').Router(),
  stripe = require('stripe')(process.env.STRIPE_URI || require('../config').stripe.uri);

router.route('/').get( async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url: 'https://www.google.com/',
    cancel_url: 'https://www.bing.com/',
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
})

module.exports = router;