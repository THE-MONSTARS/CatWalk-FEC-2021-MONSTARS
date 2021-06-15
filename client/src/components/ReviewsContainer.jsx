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
  const [ currentStarRating, setCurrentStarRating ] = useState([])

  function filterReviews(e) {
    e.preventDefault();
    console.log('clicked', e.target.value)
  }

  return (
    <RVC>
      <ReviewSorter
        filterReviews={filterReviews}
      />
      <ReviewList
        id={props.id}
        reviews={props.reviews}
        isLoading={props.isLoading}
      />
    </RVC>
  )
}

// export default class ReviewsContainer extends React.Component {
//   constructor(props) {
//     super(props)
//     this.filterReviews.bind(this);
//   }

//   filterReviews(e) {
//     e.preventDefault();
//     console.log('clicked', e.target.value)
//   }

//   render() {
//     return (
//       <RVC>
//         <ReviewSorter
//           filterReviews={this.filterReviews}
//         />
//         <ReviewList
//           id={this.props.id}
//           reviews={this.props.reviews}
//           isLoading={this.props.isLoading}
//         />
//       </RVC>
//   )
//   }
// }