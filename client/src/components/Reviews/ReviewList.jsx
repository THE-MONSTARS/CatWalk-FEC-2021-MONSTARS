import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { DefaultWidth, Header, TextLink, Button } from './styles'
import Dropdown from './Dropdown'

import Review from './Review.jsx'

//base component
function ReviewList(props) {
  const [ selectedPhoto, setSelectedPhoto ] = useState(null) //496781
  const [ sortBy, setSortBy ] = useState('date')

  function selectPhoto(e) {
    setSelectedPhoto(event.target.id)
  }

  function compareForSort(key) {
    return function innerSort(a, b) {
      if (a[key] > b[key]) {
        return -1;
      } else if (a[key] < b[key]) {
        return 1;
      }
    }
  }

  function changeSortOrder(e){
    setSortBy(e.target.value)
  }

  return (
    props.isLoading ?
    <div> Loading Reviews... </div> :
    <DefaultWidth>
        <Header> {props.reviews.length} Reviews, sorted by <Dropdown sortBy={sortBy} changeSortOrder={changeSortOrder}/> </Header>
        {!props.reviews && <DefaultWidth> No Reviews Yet! </DefaultWidth>}
        { props.reviews
          .sort(compareForSort(sortBy))
          .filter(props.currentStarRating ? review => review.rating === props.currentStarRating : review => review)
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