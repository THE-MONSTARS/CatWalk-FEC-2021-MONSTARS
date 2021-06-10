import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewSorter from './ReviewSorter.jsx';
import ReviewList from './ReviewList.jsx';

const RVC = styled.div`
margin-top: 10px;
display: flex;
flex-direction: row;
justify-content: left;
`;

export default function ReviewsContainer (props) {

  return (
    <RVC>
      <ReviewSorter /> <ReviewList id={props.id} reviews={props.reviews}/>
    </RVC>
  )
}