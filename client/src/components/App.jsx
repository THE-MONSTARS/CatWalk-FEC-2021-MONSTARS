import React, { useEffect, useState } from 'react';
import OverView from './OverView.jsx';
import ReviewList from './ReviewList.jsx';
import RelatedContainer from './RelatedContainer.jsx';
import axios from 'axios';


const App = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ currentProduct, setCurrentProduct ] = useState({})
  const [ styles, setStyles ] = useState([])

  const fetchProductAndId = async () => {
    try {
      // need to fetch all products first to see what the id for first product is
      const productsData = await getProducts()

      const id = productsData[0].id
      const productData = await getOneProduct(id);
      setCurrentProduct(productData);

      const stylesData = await getStyles(id);
      setStyles(stylesData);
      setIsLoading(false);

    } catch (err) {
      console.log('error fetching product & styles data: ', err);
    }
  }

  const getProducts = async () => {
    const fetchedProducts = await axios.get('/products');
    return fetchedProducts.data;
  }

  const getOneProduct = async (id) => {
    const fetchedProduct = await axios.get(`/products/${id}`);
    setCurrentProduct(fetchedProduct.data)
    return fetchedProduct.data;
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
        <OverView id={id} currentProduct={currentProduct} styles={styles}/>
        <RelatedContainer id={id} getOneProduct={getOneProduct}/>
        <ReviewList id={id}/>
      </div>
      )
    );

}

export default App;


