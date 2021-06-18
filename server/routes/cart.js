const express = require('express');
const cart = express.Router();
const API = require('../../apiHelpers/atelier');

cart
  .route('/')
  .get((req, res) => {
    return API.getCart(req.body)
      .then(res => {
        res.status(200).send(res);
        console.log('error getting cart ,', err)
      })
      .catch(err => {
        res.status(404).send(err);
        console.log('failure')
      })
  })
  .post((req, res) => {
    return API.addToCart(req.body)
      .then(res => {
        res.status(200).send('successfully posted to cart')
        console.log('sucess')
      })
      .catch(err => {
        res.status(404).send(err);
        console.log('failure')
      })
  })

  module.exports = cart;