const express = require('express');
const reviews = express.Router();
const API = require('../../apiHelpers/atelier')

reviews
  .route('/:product_id/:sort_order?')
  .get((req, res) => {
    let product_id = req.params.product_id;
    console.log(req.params)
    let sort_order = 'newest';
    if (req.params.sort_order) {
      sort_order = req.params.sort_order
    }
    return API.getReviews(product_id, sort_order)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(400).send('error retrieving reviews: ', err)
    })
  })

  module.exports = reviews;