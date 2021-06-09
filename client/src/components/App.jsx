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
      const productsData = await getProduct()
      setProducts(productsData);

      // defaulting current product to first product from products data
      setCurrentProduct(productsData[0]);

      let productId = productsData[0].id;
      const stylesData = await getStyles(productId);
      setStyles(stylesData);
      setIsLoading(false);

    } catch (err) {
      console.log('error fetching product & styles data: ', err);
    }
  }

  const getProduct = async () => {
    const fetchedProducts = await axios.get('/products');
    setProducts(fetchedProducts.data)
    return fetchedProducts.data;
  }

  const getStyles = async (id) => {
    const fetchedStyles = await axios.get(`/products/${id}/styles`);
    setStyles(fetchedStyles.data.results)
    return fetchedStyles.data.results;
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
        <OverView id={id} currentProduct={currentProduct} styles ={styles} getStyles={getStyles}/>
        <RelatedContainer id={id} getProduct={getProduct}/>
        <ReviewList id={id}/>
      </div>
      )
    );

}

export default App;


