const express = require('express');
const qa = express.Router();

qa
  .route('/')
  .get((req, res) => {
    res.status(200).send('hello from qa!')
  })

  module.exports = qa;