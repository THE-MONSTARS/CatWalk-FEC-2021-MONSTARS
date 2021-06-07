const express = require('express');
const router = express.Router();

// importing individual routes
const products = require('./routes/products.js');
const reviews = require('./routes/reviews.js');
const qa = require('./routes/qa.js');
const cart = require('./routes/cart.js');
const interactions = require('./routes/interactions.js');

// actual routing of endpoints
router.use('/products', products)
router.use('/reviews', reviews)
router.use('/qa', qa)
router.use('/cart', cart)
router.use('/interactions', interactions)

module.exports = router;