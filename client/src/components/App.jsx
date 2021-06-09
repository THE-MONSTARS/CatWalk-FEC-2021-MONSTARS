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

      const productId = currentProduct.id;
      const fetchedStyles = await axios.get(`/products/${productId}/styles`);
      const stylesData = fetchedStyles.data.results;
      setStyles(stylesData);
      setIsLoading(false);

    } catch (err) {
      console.log('error fetching product & styles data: ', err);
    }
  }

  useEffect(() => {
    fetchProductAndId();

  }, []);

    const id = currentProduct.id;

    return (
      isLoading
      ? <div>Loading...</div>
      : (
      <div>
        <OverView id={id} currentProduct={currentProduct} setStyles={setStyles}/>
        <RelatedContainer id={id} setCurrentProduct={setCurrentProduct}/>
        <ReviewList id={id}/>
      </div>
      )
    );

}

export default App;