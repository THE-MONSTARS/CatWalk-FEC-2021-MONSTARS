import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import credentials from '../../../../config.js'
const url = 'http://localhost:3000'

import Review from './Review.jsx'

//base component
function ReviewList(props) {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ reviews, setReviews ] = useState([props.reviews]);
  const [ productId, setProductId ] = useState(props.id);

  return (
    props.isLoading ?
    <div> Loading Reviews... </div> :
    <div>
        { props.reviews.map((review, index) => (
        <Review summary={review.summary} body={review.body} date={review.date} key={index} reviewer_name={review.reviewer_name} rating={review.rating}/>))}
    </div>
  )
}

export default ReviewList;