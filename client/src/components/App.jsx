import React, { useEffect, useState } from 'react';
import OverView from './OverView.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import RelatedContainer from './RelatedContainer.jsx';
import ReviewsContainer from './ReviewsContainer.jsx';
import axios from 'axios';
import styled from 'styled-components';
import useEffectAfterRender from './utils/useEffectAfterRender.jsx';

const App = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ currentProduct, setCurrentProduct ] = useState({ id: 16056 })
  const [ styles, setStyles ] = useState([])
  const [ currentStyle, setCurrentStyle ] = useState({})
  const [ reviews, setReviews ] = useState([])

  // product update on startup
  const fetchProductAndId = async () => {
    try {
      const id = currentProduct.id;

      const initialFetchCalls = [getOneProduct(id), getStyles(id), getReviews(id)];
      const [fetchedProduct, fetchedStyles, fetchedReviews] = await Promise.all(initialFetchCalls)
      const defaultStyle = fetchedStyles.find(style => style['default?']) || fetchedStyles[0];

      setCurrentProduct(fetchedProduct);
      setStyles(fetchedStyles);
      setCurrentStyle(defaultStyle);
      setReviews(fetchedReviews);

      setIsLoading(false);
    } catch (err) {
      console.log('error fetching product & styles data: ', err);
    }
  }

  // update on each subsequent setCurrentProduct
  const updateProductAndId = async () => {
    const updateProductCalls = [getStyles(id), getReviews(id)];
    const [ newStyles, newReviews ] = await Promise.all(updateProductCalls)
    const defaultStyle = newStyles.find(style => style['default?']) || newStyles[0];

    setStyles(newStyles);
    setCurrentStyle(defaultStyle)
    setReviews(newReviews);
    setIsLoading(false);
  }

  // API calls
  const getProducts = async () => {
    const fetchedProducts = await axios.get('/products');
    return fetchedProducts.data;
  }

  const getOneProduct = async (id) => {
    const fetchedProduct = await axios.get(`/products/${id}`);
    return fetchedProduct.data;
  }

  const getStyles = async (id) => {
    const fetchedStyles = await axios.get(`/products/${id}/styles`);
    return fetchedStyles.data.results;
  }

  const getReviews = async (id) => {
    const fetchedReviews = await axios.get(`/reviews/${id}`);
    return fetchedReviews.data.results;
  }

  useEffect(() => {
    fetchProductAndId();
  }, []);

  useEffectAfterRender(() => {
    updateProductAndId();
  }, [currentProduct])

  let id = currentProduct.id;

  return (
    isLoading
    ? <div>Loading...</div>
    : (
    <div>
      <OverView
        id={id}
        currentProduct={currentProduct}
        styles={styles}
        currentStyle={currentStyle}
        reviews={reviews}
        setCurrentStyle={setCurrentStyle}
      />
      <RelatedContainer
        id={id}
        getOneProduct={getOneProduct}
        getStyles={getStyles}
        setCurrentProduct={setCurrentProduct}
      />
      <ReviewsContainer
        id={id}
        reviews={reviews}
        isLoading={isLoading}
      />
    </div>
    )
  );

}

export default App;


