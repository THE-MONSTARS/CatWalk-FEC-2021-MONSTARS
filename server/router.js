const express = require('express');
const router = express.Router();

// individual routes
const products = require('./routes/products.js');
const reviews = require('./routes/revews.js');
const qa = require('./routes/qa.js');
const cart = require('./routes/cart.js');

// edge case router for testing empty endpoint
router.get('/', (req, res) => {
  console.log('got a get request!');
  res.status(200).send('good job getting to this handler, but you need to specify an endpoint for data.')
})

// actual routing of endpoints
router.use('/products', products)
router.use('/reviews', reviews)
router.use('/qa', qa)
router.use('/cart', cart)

module.exports = router;