const express = require('express');
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    console.log('got a get request!');
    res.status(200).send('good job getting to this handler')
  })

// router
//   .route('/')

// router
//   .route('/')

module.exports = router;