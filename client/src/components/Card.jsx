import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Card () {
  const [productInfo, setProductInfo] = useState([])

  const getProductInfo = () => {
    axios.get('/product/productid')
      .then((rawData) => {
        setProductInfo([rawData.data])
      })
      .catch((err) => {
        console.log('Error getting Product...', err)
      })
  }

  return (
    <div>
      <p>Some overlay action Component</p>
      <img></img>
      <h4>Product Category</h4>
      <h2>Product Name</h2>
      <h3>Price</h3>
      <p>Star Component</p>
    </div>
  )


}