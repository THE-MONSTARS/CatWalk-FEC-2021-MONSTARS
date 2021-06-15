/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Card from './Card.jsx';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function RelatedContainer ({id, getOneProduct, getStyles, setCurrentProduct, currentProduct}) {

  const [productsInfo, setProductsInfo] = useState([])
  const [currentId, setCurrentId] = useState()
  const dummyId = 16059;


    function getRelatedProducts(productId) {
      const fetchedRelatedProducts = axios.get(`/products/${productId}/related`);
      return fetchedRelatedProducts;
  }

    async function getAverageRating(productId) {
      const fetchedReviewMetaData = await axios.get(`/reviews/${productId}/meta`)
      const ratings = fetchedReviewMetaData.data.ratings
      console.log('Ratings...', ratings)

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
      currentProductData.features = productDetail.features;

      let defaultStyle = productStyles.find(entry => entry['default?'] === true || productStyles[0])

      currentProductData.sale_price = defaultStyle.sale_price;
      currentProductData.original_price = defaultStyle.original_price;
      currentProductData.image = defaultStyle.photos[0].url

      currentProductData.rating = productRating


      relatedProducts.push(currentProductData);
    }
    setProductsInfo(relatedProducts)
    setCurrentId(id)
  }


  useEffect(()=> {
    startup()
  }, [id])



  return (
    //map with card component. Inline Style Temp until Css file created
    <div style={{width: '50%'}}>
    <Carousel responsive= {responsive} centerMode= {true} >
      {productsInfo.map((entry, index) => (
        <Card key={index} product={entry} setCurrentProduct={setCurrentProduct} overviewProduct ={currentProduct}/>
      ))}

    </Carousel>

    </div>
  )

}









