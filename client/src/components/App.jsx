import React, { useEffect, useState } from 'react';
import OverView from './OverView.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import RelatedContainer from './RelatedContainer.jsx';
import ReviewsContainer from './Reviews/ReviewsContainer.jsx';
import axios from 'axios';


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
      await Promise.all(initialFetchCalls)

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
    setCurrentProduct(fetchedProduct.data)
    return fetchedProduct.data;
  }

  const getStyles = async (id) => {
    const fetchedStyles = await axios.get(`/products/${id}/styles`);
    setStyles(fetchedStyles.data.results)
    return fetchedStyles.data.results;
  }

  const getReviews = async (id) => {
    const fetchedReviews = await axios.get(`/reviews/${id}`);
    setReviews(fetchedReviews.data.results)
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
        <RelatedContainer id={id} getOneProduct={getOneProduct} getStyles={getStyles} />
        <ReviewsContainer id={id} reviews={reviews}/>
      </div>
      )
    );

}

export default App;


