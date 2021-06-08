const endpoint = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax'; //note that all endpoints must contain a '/' after 'hr-lax'
const credentials = require('../config.js')
// import credentials from '../config.js'
const axios = require ('axios');

module.exports = {
  getProducts: function(callback) {
    axios({
      method: 'GET',
      url: `${endpoint}/products`,
      headers: { 'Authorization': credentials.TOKEN },
    })
    .then(res => {
      console.log(res.data)
      callback(null, res.data)
      // this.updateReviews(data)
    })
    .catch(err => {
      console.log(err)
      callback(err, null)
    })
  },

  getProductById: function(product_id, callback) {
    const params = new URLSearchParams({ product_id: product_id, })

    axios({
      method: 'GET',
      url: `${endpoint}/products?${params}`,
      headers: { 'Authorization': credentials.TOKEN },
    })
    .then(res => {
      console.log(res.data)
      callback(null, res.data)
    })
    .catch(err => {
      console.log(err)
      callback(err, null)
    })
  },

  getReviews: function(product_id, sort_order, callback) {
    const params = new URLSearchParams({ sort: sort_order, product_id: `${product_id}`, })
    axios({
      method: 'GET',
      url: `${endpoint}/reviews?${params}`,
      headers: { 'Authorization': credentials.TOKEN },
    })
    .then(res => {
      // console.log(res.data.results)
      callback(null, res.data)
      // this.updateReviews(data)
    })
    .catch(err => {
      console.log(err)
      callback(err, null)
    })
  // callback(null, "hello from getReviews!")
  },

};
