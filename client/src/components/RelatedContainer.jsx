/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Card from './Card.jsx';
import axios from 'axios';

export default function RelatedContainer ({id, getOneProduct, getStyles}) {

  //Need to be able to get an array of all apporiate data
  //could look into like a promise all to grab both style and product data then create an array of objects with just the
  //related data needed. {category,name,img,star,def price, sale price }

  //style data need to search styles find default? to be true and use that data...
  const [productsInfo, setProductsInfo] = useState([1,2,3])//DummyData set to 3 indexes
  const [loading, setLoading] = useState(true)
  const dummyId = 16059;


    function getRelatedProducts(productId) {
      const fetchedRelatedProducts = axios.get(`/products/${productId}/related`);
      return fetchedRelatedProducts;
  }

    async function getProductDetails(productId) {
      const fetchedProduct = await axios.get(`/products/${productId}`);
      return fetchedProduct.data;

  }


  async function getProductStyle(productId) {
    const rawData = await axios.get(`/products/${productId}/styles`)
    const style = rawData.data.results.find(entry =>
        entry['default?'] === true
      )
    return style
    }


  const startup = async () => {
    let relatedProductIds = await getRelatedProducts(id) // assuming this is async function

    const relatedProducts = [];
    console.log('Array of Product Ids', relatedProductIds.data)
    for (let productId of relatedProductIds.data) {

      const promises = [getOneProduct(productId), getStyles(productId)]

      let [ productDetail, productStyles ] = await Promise.all(promises)

      let currentProductData = {};

      currentProductData.id = productDetail.id;
      currentProductData.category = productDetail.category;
      currentProductData.name = productDetail.name;

      let defaultStyle = productStyles.find(entry => entry['default?'] === true || productStyles[0])

      currentProductData.sale_price = defaultStyle.sale_price;
      currentProductData.original_price = defaultStyle.original_price;
      currentProductData.image = defaultStyle.photos[0].url


      relatedProducts.push(currentProductData);
    }
    setProductsInfo(relatedProducts)
    setLoading(false)
  }


  useEffect(()=> {
    startup()
  }, [])



  return (
    //map with card component. Inline Style Temp until Css file created
    <div style={{display: 'flex', flexDirection:'row'}}>
      {productsInfo.map((entry, index) => (
        <Card key={index} />
      ))}
      {/* {loading ? <p>Loading...</p> : <p>Not loading! {productsInfo[0].name}</p>} */}
    </div>
  )

}









