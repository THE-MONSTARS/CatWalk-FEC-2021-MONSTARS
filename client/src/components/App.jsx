import React, { useEffect, useState } from 'react';
import OverView from './OverView.jsx';
import ReviewList from './ReviewList.jsx';
import RelatedContainer from './RelatedContainer.jsx';
import axios from 'axios';


const App = () => {
  const [ products, setProducts ] = useState([])
  const [ currentProduct, setCurrentProduct ] = useState()
  const [ styles, setStyles ] = useState([])


  const fetchProductAndId = async () => {
    try {
      const fetchedProducts = await axios.get('/products')
      const productsData = fetchedProducts.data;
      setProducts(productsData);
      setCurrentProduct(productsData[0]);

      const productId = productsData[0].id;
      const fetchedStyles = await axios.get(`/products/${productId}/styles`);
      const stylesData = fetchedStyles.data.results;
      setStyles(stylesData);

    } catch (err) {
      console.log('error fetching product & styles data: ', err);
    }
  }


  useEffect(() => {
    fetchProductAndId()

  }, []);


    return (
      <div>
        <OverView />
        <RelatedContainer />
        <ReviewList />
      </div>
    );

}

export default App;