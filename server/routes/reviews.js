const express = require('express');
const reviews = express.Router();

reviews
  .route('/')
  .get((req, res) => {
    res.status(200).send('hello from reviews!')
  })

  module.exports = reviews;