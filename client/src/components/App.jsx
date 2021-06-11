import React, { useEffect, useState } from 'react';
import OverView from './OverView.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import RelatedContainer from './RelatedContainer.jsx';
import ReviewSorter from './Reviews/ReviewSorter.jsx';
import axios from 'axios';
import styled from 'styled-components';

const RVC = styled.div`
margin-top: 10px;
display: flex;
flex-direction: row;
justify-content: left;
`;

const App = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ currentProduct, setCurrentProduct ] = useState({})
  const [ styles, setStyles ] = useState([])
  const [ reviews, setReviews ] = useState([])

  const fetchProductAndId = async () => {
    try {
      // need to fetch all products first to see what the id for first product is
      const productsData = await getProducts()
      const id = productsData[0].id;

      // doing this saves time
      const initialFetchCalls = [getOneProduct(id), getStyles(id), getReviews(id)];
      const [fetchedProduct, fetchedStyles, fetchedReviews] = await Promise.all(initialFetchCalls)
      setCurrentProduct(fetchedProduct)
      setStyles(fetchedStyles)
      setReviews(fetchedReviews)

      setIsLoading(false);

    } catch (err) {
      console.log('error fetching product & styles data: ', err);
    }
  }
  // this function purely exists to get the first id of the products for initial boot
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

    let id = currentProduct.id;

    return (
      isLoading
      ? <div>Loading...</div>
      : (
      <div>
        <OverView id={id} currentProduct={currentProduct} styles={styles} reviews={reviews}/>
        <RelatedContainer id={id} getOneProduct={getOneProduct} getStyles={getStyles} setCurrentProduct={setCurrentProduct}/>
        <RVC> <ReviewSorter /> <ReviewList id={id} reviews={reviews}/> </RVC>
      </div>
      )
    );

}

export default App;


