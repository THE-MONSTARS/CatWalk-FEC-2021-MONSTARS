/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import Card from './Card.jsx';
import axios from 'axios';

export default function RelatedContainer () {
  //Need to be able to get an array of all apporiate data
  //could look into like a promise all to grab both style and product data then create an array of objects with just the
  //related data needed. {category,name,img,star,def price, sale price }

  //style data need to search styles find default? to be true and use that data...
  const [productInfo, setProductInfo] = useState([1,2,3])//DummyData set to 3 indexes

  //Method will be need to break up more below
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
    //map with card component. Inline Style Temp until Css file created
    <div style={{display: 'flex', flexDirection:'row'}}>
      {productInfo.map((entry, index) => (
        <Card key={index} />
      ))}
    </div>
  )

}