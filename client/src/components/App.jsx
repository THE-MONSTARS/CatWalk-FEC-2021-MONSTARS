import React, { useEffect, useState } from 'react';
import OverView from './OverView.jsx';
import ReviewList from './ReviewList.jsx';
import RelatedContainer from './RelatedContainer.jsx';
import axios from 'axios';


const App = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ products, setProducts ] = useState([])
  const [ currentProduct, setCurrentProduct ] = useState({})
  const [ styles, setStyles ] = useState([])

  const fetchProductAndId = async () => {
    try {
      const fetchedProducts = await axios.get('/products')
      const productsData = fetchedProducts.data;
      setProducts(productsData);

      // defaulting current product to first product from products data
      setCurrentProduct(productsData[0]);

      let productId = productsData[0].id;
      const fetchedStyles = await axios.get(`/products/${productId}/styles`);
      const stylesData = fetchedStyles.data.results;
      console.log('styles data: ', fetchedStyles);
      setStyles(stylesData);
      setIsLoading(false);

    } catch (err) {
      console.log('error fetching product & styles data: ', err);
    }
  }

  useEffect(() => {
    fetchProductAndId();
  }, []);

    let id = currentProduct.id;

    return (
      isLoading
      ? <div>Loading...</div>
      : (
      <div>
        <OverView id={id} currentProduct={currentProduct} styles ={styles} setStyles={setStyles}/>
        <RelatedContainer id={id} setCurrentProduct={setCurrentProduct}/>
        <ReviewList id={id}/>
      </div>
      )
    );

}

export default App;


