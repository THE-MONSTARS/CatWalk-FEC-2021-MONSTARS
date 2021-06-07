const express = require('express');
const interactions = express.Router();

// adds interaction to db.
// takes in body params {element, widget, time}
interactions
  .route('/')
  .post((req, res) => {
    res.status(200).send('hello from interactions!');
  })

  module.exports = interactions;