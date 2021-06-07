const express = require('express');
const cart = express.Router();

cart
  .route('/')
  .get((req, res) => {
    res.status(200).send('hello from cart!')
  })

  module.exports = cart;