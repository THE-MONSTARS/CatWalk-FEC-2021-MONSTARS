import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import credentials from '../../../../config.js'
const url = 'http://localhost:3000'

import Review from './Review.jsx'

const DefaultWidth = styled.div`
  min-width: 600px;
  position: left;
`;

//base component
function ReviewList(props) {
  const [ selectedPhoto, setSelectedPhoto ] = useState(null) //496781

  function selectPhoto(e) {
    console.log(event.target.id)
    setSelectedPhoto(event.target.id)
  }

  return (
    props.isLoading ?
    <div> Loading Reviews... </div> :
    <DefaultWidth>
        {!props.reviews && <DefaultWidth> No Reviews Yet! </DefaultWidth>}

        { props.reviews.filter(props.currentStarRating ? review => review.rating === props.currentStarRating : review => review)
          .map((review, index) => (
            <Review
              summary={review.summary}
              body={review.body}
              date={review.date}
              key={review.review_id}
              reviewer_name={review.reviewer_name}
              rating={review.rating}
              photos={review.photos}
              selectPhoto={selectPhoto}
              selectedPhoto={selectedPhoto}
              helpfulness={review.helpfulness}
              recommend={review.recommend}
            />
          ))
        }
    </DefaultWidth>
  )
}

export default ReviewList;