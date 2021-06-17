import React, { useEffect, useState } from 'react';
import ReviewList from './Reviews/ReviewList.jsx';
import RelatedContainer from './RelatedContainer.jsx';
import ReviewSorter from './Reviews/ReviewSorter.jsx';
import axios from 'axios';
import styled from 'styled-components';
import useEffectAfterRender from './utils/useEffectAfterRender.jsx';

const RVC = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

export default function ReviewsContainer (props) {
  const [ currentStarRating, setCurrentStarRating ] = useState(null)

  function setStarRatingFilter(e) {
    e.preventDefault();
    console.log('show only ratings: ', e.target.value)
    setCurrentStarRating(Number(e.target.value))
  }

  return (
    <RVC ref={props.reference}>
      <ReviewSorter
        setStarRatingFilter={setStarRatingFilter}
      />
      <ReviewList
        id={props.id}
        reviews={props.reviews}
        isLoading={props.isLoading}
        currentStarRating={currentStarRating}
      />
    </RVC>
  )
}