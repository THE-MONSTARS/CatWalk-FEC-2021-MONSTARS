const express = require('express');
const path = require('path');
const router = require('./router.js');
const port = 3000;
let app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')))
// app.get('/home')
app.use('/api', router)


app.listen(port, err => {
  if (err) {
    console.log('error listening on port: ', err);
  } else {
    console.log('listening on port: ', port);
  }
})