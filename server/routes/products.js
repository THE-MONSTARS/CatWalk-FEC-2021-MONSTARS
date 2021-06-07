const express = require('express');
const products = express.router();

// retrieves the list of products. takes in 2 parameters {page, count}
products
  .route('/')
  .get()

// get all product level information for specified product id
products
  .route('/:product_id')
  .get()

// return all styles available for the given product
products
  .route('/:product_id/styles')
  .get()

  // return the id's of products related to the product specified
products
  .route('/:product_id/related')
  .get()

  module.exports = products;