const express = require('express');
const products = express.Router();
const API = require('../../apiHelpers/atelier')

// retrieves the list of products. takes in 2 parameters {page, count}
products
  .route('/')
  .get((req, res) => {
    API.getProducts((err, response) => {
      if (err) {
        console.log(err)
        res.status(400).send("error from products:", err)
      } else {
        res.status(200).send(response)
      }
    })
  })

// get all product level information for specified product id
products
  .route('/:product_id')
  .get((req, res) => {
    API.getProductById(req.params.id, (err, response) => {
      if (err) {
        console.log(err)
        res.status(400)
      } else {
        res.status(200).send(response)
      }
    })
  })

// return all styles available for the given product
products
  .route('/:product_id/styles')
  .get()

  // return the id's of products related to the product specified
products
  .route('/:product_id/related')
  .get()

  module.exports = products;