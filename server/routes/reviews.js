const express = require('express');
const reviews = express.Router();
const API = require('../../apiHelpers/atelier')

reviews
  .route('/:product_id/:sort_order?')
  .get((req, res) => {
    var product_id = req.params.product_id;
    console.log(req.params)
    var sort_order = 'newest';
    if (req.params.sort_order) {
      sort_order = req.params.sort_order
    }
    API.getReviews(product_id, sort_order, (err, response) => {
      if (err) {
        console.log(err)
        res.status(err)
      } else {
        res.status(200).send(response)
      }
    })
  })

  module.exports = reviews;