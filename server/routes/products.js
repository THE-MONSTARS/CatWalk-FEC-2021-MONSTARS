const express = require('express');
const products = express.Router();
const API = require('../../apiHelpers/atelier')

// retrieves the list of products. takes in 2 parameters {page, count}
products
  .route('/')
  .get((req, res) => {
    return API.getProducts()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(400).send('error retrieving products: ', err)
    })
  })

// get all product level information for specified product id
products
  .route('/:product_id')
  .get((req, res) => {
    return API.getProductById(req.params.product_id)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(400).send('error retrieving product by id: ', err)
    })
  })

// return all styles available for the given product
products
  .route('/:product_id/styles')
  .get((req, res) => {
    return API.getStylesById(req.params.product_id)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(400).send('error retrieving styles by id: ', err)
    })
  })

  // return the id's of products related to the product specified
products
  .route('/:product_id/related')
  .get((req, res) => {
    return API.getRelatedProductsById(req.params.product_id)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(400).send('error retrieving related products by id: ', err)
    })
  })

  module.exports = products;
