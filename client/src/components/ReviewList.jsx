import React, { useState, useEffect } from 'react';
import axios from 'axios';
import credentials from '../../../config.js'
import Review from './Review.jsx'
const url = 'http://localhost:3000'

function ReviewList() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ reviews, setReviews ] = useState([]);
  const [ productId, setProductId ] = useState(16057);

  function getReviews() {
    setIsLoading(true)
    return axios({
      method: 'GET',
      url: `${url}/reviews/${productId}`,
      headers: { 'Authorization': credentials.TOKEN },
    })
    .then(res => {
      setReviews(res.data.results)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getReviews();
  }, [])
   //cleanup?

  return (
    isLoading ?
    <div> Loading Reviews... </div> :
    <div> Reviews:
        {reviews.map((review, index) => (
        <Review summary={review.summary} body={review.body} date={review.date} key={index} reviewer_name={review.reviewer_name} rating={review.rating}/>))}
    </div>
  )
}

export default ReviewList;