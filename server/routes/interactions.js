const express = require('express');
const interactions = express.Router();
const API = require('../../apiHelpers/atelier')

// adds interaction to db.
// takes in body params {element, widget, time}
interactions
  .route('/')
  .post((req, res) => {
    const clickData = req.body;
    console.log('req is: ', req.body)
    return API.postInteraction(clickData)
      .then(sucess => {
        console.log('sucessfully posted interaction');
        res.status(200).send('posted interaction!');
      })
      .catch(err => {
        console.log('failed posting interaction');
        res.status(404).send(err);
      })
  })

  module.exports = interactions;