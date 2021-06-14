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

  return (
    <RVC>
      <ReviewSorter /> <ReviewList id={props.id} reviews={props.reviews}/>
    </RVC>
  )
}