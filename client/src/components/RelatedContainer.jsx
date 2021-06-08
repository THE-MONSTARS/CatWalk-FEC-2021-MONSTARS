/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Card from './Card.jsx';
import axios from 'axios';

export default function RelatedContainer () {
  //Need to be able to get an array of all apporiate data
  //could look into like a promise all to grab both style and product data then create an array of objects with just the
  //related data needed. {category,name,img,star,def price, sale price }

  //style data need to search styles find default? to be true and use that data...
  const [productsInfo, setProductsInfo] = useState([1,2,3])//DummyData set to 3 indexes
  const dummyId = 1;
  //Method will be need to break up more below
  async function getProductsInfo(Id) {

    const constructedItem = {}

    const relatedArrayData = await axios.get(`/products/${dummyId}/related`)
    console.log('RelatedArrayData:', relatedArrayData)
    //Will do major testing on this once server requests are up and running
    const allProductData = Promise.all(relatedArrayData.map(itemId => {
      axios.get(`/products/${itemId}`)
        .then((productData) => {
          constructedItem.name = productData.name;
          constructedItem.category = productData.category;
        })
        .then((productData)=>{
          axios.get(`/products/${itemId}/styles`)
          .then((styleData) => {
            styleData.results.filter(item => {
              if(item['default?'] === true) {
                constructedItem.thumbnail_url = item.photos[0].thumbnail_url
                constructedItem.original_price = item.original_price
                constructedItem.sale_price = item.sale_price
              }
            })
          })
        })
      }))
      setProductsInfo(allProductData)
  }

  //filterstyle function

  useEffect(()=>{
    getProductsInfo(dummyId)
  },[])

  return (
    //map with card component. Inline Style Temp until Css file created
    <div style={{display: 'flex', flexDirection:'row'}}>
      {productsInfo.map((entry, index) => (
        <Card key={index} />
      ))}
    </div>
  )

}