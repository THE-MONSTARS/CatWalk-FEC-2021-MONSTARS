import React, { useEffect, useState, useRef } from 'react';
import Header from './Header.jsx';
import OverView from './OverView.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import RelatedContainer from './RelatedContainer.jsx';
import OutfitContainer from './OutfitContainer.jsx';
import { ReviewsContainer } from './ReviewsContainer.jsx';
import axios from 'axios';
import styled from 'styled-components';
import useEffectAfterRender from './utils/useEffectAfterRender.jsx';
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import ALS from '@createnextapp/async-local-storage';

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
  z-index: 2000;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const App = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ currentProduct, setCurrentProduct ] = useState({ id: 16056 })
  const [ styles, setStyles ] = useState([])
  const [ currentStyle, setCurrentStyle ] = useState({})
  const [ reviews, setReviews ] = useState([])
  const [ averageRating, setAverageRating ] = useState(3)

  const reviewsRef = useRef(null);

  const getAverageRating = () => {
    return reviews.reduce((acc, review) => {
      return acc + review.rating
    }, 0) / reviews.length;
  }

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
    const cachedProducts = await ALS.getItem('products');
    if (cachedProducts) {
      return cachedProducts;
    } else {
      const fetchedProducts = await axios.get('/products');
      await ALS.setItem('products', fetchedProducts);
      return fetchedProducts.data;
    }
  }

  const getOneProduct = async (id) => {
    const cachedProductName = `product-id-${id}`;
    const cachedProduct = await ALS.getItem(`${cachedProductName}`);
    if (cachedProduct) {
      return JSON.parse(cachedProduct);
    } else {
      const fetchedProduct = await axios.get(`/products/${id}`);
      await ALS.setItem(cachedProductName, JSON.stringify(fetchedProduct.data));
      return fetchedProduct.data;
    }
  }

  const getStyles = async (id) => {
    const cachedStyleName = `style-id-${id}`;
    const cachedStyle = await ALS.getItem(`${cachedStyleName}`);
    if (cachedStyle) {
      return JSON.parse(cachedStyle);
    } else {
      const fetchedStyles = await axios.get(`/products/${id}/styles`);
      await ALS.setItem(cachedStyleName, JSON.stringify(fetchedStyles.data.results));
      return fetchedStyles.data.results;
    }
  }

  const getReviews = async (id) => {
    const cachedReviewsName = `reviews-id-${id}`;
    const cachedReviews = await ALS.getItem(`${cachedReviewsName}`);
    if (cachedReviews) {
      return JSON.parse(cachedReviews);
    } else {
      const fetchedReviews = await axios.get(`/reviews/${id}`);
      await ALS.setItem(cachedReviewsName, JSON.stringify(fetchedReviews.data.results));
      return fetchedReviews.data.results;
    }
  }

  //hooks and refs
  const handleScrollToRef = () => {
    reviewsRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    fetchProductAndId();
  }, []);

  useEffectAfterRender(() => {
    updateProductAndId();
  }, [currentProduct])

  useEffect(() => {
    let average = getAverageRating();
    setAverageRating(average);
  }, [reviews])

  let id = currentProduct.id;

  return (
    isLoading
    ? <div>Loading...</div>
    : (
    <AppContainer>
      <Header/>
      <ModalProvider backgroundComponent={FadingBackground}>
      <OverView
        id={id}
        currentProduct={currentProduct}
        styles={styles}
        currentStyle={currentStyle}
        averageRating={averageRating}
        setCurrentStyle={setCurrentStyle}
        handleScrollToRef={handleScrollToRef}
      />
      <RelatedContainer
        id={id}
        getOneProduct={getOneProduct}
        averageRating={averageRating}
        getStyles={getStyles}
        setCurrentProduct={setCurrentProduct}
        currentProduct={currentProduct}
      />
      <OutfitContainer
        currentProduct = {currentProduct}
        currentStyle={currentStyle}
        reviews={reviews}
      />
      <ReviewsContainer
        id={id}
        reviews={reviews}
        averageRating={averageRating}
        isLoading={isLoading}
        reference={reviewsRef}
      />
      </ModalProvider>
    </AppContainer>
    )
  );

}

export default App;


