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

const HeaderDiv = styled.div`
  color: Black;
  font-weight: bold;
  font-size: large;
  font-family: 'Bebas Neue';
  letter-spacing: 1px;
  margin: none;
`;

function ReviewsContainer (props) {
  const [ currentStarRating, setCurrentStarRating ] = useState(null)
  const [ ratingsLoaded, setRatingsLoaded ] = useState(false)
  const [ totalRatings, setTotalRatings ] = useState({
    'total': 0,
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    })

  function getTotalRatings(reviews) {
    let newTotalRatings = totalRatings;
    newTotalRatings.total = reviews.length;
    reviews.forEach(review => {
      newTotalRatings[review.rating] = newTotalRatings[review.rating] + 1;

    })
    console.log(newTotalRatings);
    setTotalRatings(newTotalRatings);
    setRatingsLoaded(true);
  }

  function setStarRatingFilter(e) {
    e.preventDefault();
    console.log('show only ratings: ', e.target.value)
    setCurrentStarRating(Number(e.target.value))
  }

  useEffect(() => {
    getTotalRatings(props.reviews)

  }, []);

  return (
    ratingsLoaded &&
    <RVC ref={props.reference}>
      <ReviewSorter
        setStarRatingFilter={setStarRatingFilter}
        totalRatings={totalRatings}
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

export {
  ReviewsContainer,
  HeaderDiv
}