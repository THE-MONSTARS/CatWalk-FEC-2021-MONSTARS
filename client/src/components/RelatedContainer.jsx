/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Card from './Card.jsx';
import axios from 'axios';

export default function RelatedContainer ({id, getOneProduct, getStyles}) {

  const [productsInfo, setProductsInfo] = useState([])//DummyData set to 3 indexes
  const [loading, setLoading] = useState(true)
  const dummyId = 16059;


    function getRelatedProducts(productId) {
      const fetchedRelatedProducts = axios.get(`/products/${productId}/related`);
      return fetchedRelatedProducts;
  }

    async function getAverageRating(productId) {
      const fetchedReviewMetaData = await axios.get(`/reviews/${productId}/meta`)
      const ratings = fetchedReviewMetaData.data.ratings

      let total =0;
      let ratingsTotal=0;
      let average=0;

      for(let number in ratings) {
        total += Number.parseInt(ratings[number]) * Number.parseInt(number);
        ratingsTotal+= Number.parseInt(number);
      }
      average = total/ratingsTotal;
      return average.toFixed(1)
    }


  const startup = async () => {
    let relatedProductIds = await getRelatedProducts(id)
    const relatedProducts = [];

    for (let productId of relatedProductIds.data) {

      const promises = [getOneProduct(productId), getStyles(productId), getAverageRating(productId)]

      let [ productDetail, productStyles, productRating ] = await Promise.all(promises)

      let currentProductData = {};

      currentProductData.id = productDetail.id;
      currentProductData.category = productDetail.category;
      currentProductData.name = productDetail.name;

      let defaultStyle = productStyles.find(entry => entry['default?'] === true || productStyles[0])

      currentProductData.sale_price = defaultStyle.sale_price;
      currentProductData.original_price = defaultStyle.original_price;
      currentProductData.image = defaultStyle.photos[0].url

      currentProductData.rating = productRating


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
        <Card key={index} id={entry.id} category={entry.category} name={entry.name} salePrice={entry.sale_price} orginalPrice={entry.original_price} img={entry.image} rating={entry.rating} />
      ))}
      {/* {loading ? <p>Loading...</p> : <p>Not loading! {productsInfo[0].name}</p>} */}
    </div>
  )

}









