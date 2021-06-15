import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRating from '../StarRating.jsx';

const RDC = styled.div`
  font-family: Helvetica, sans-serif;
  margin-left: 10px;
  margin-right: 10px;
  min-width: 140px;
`;

const Header = styled.div`
  font-size: medium;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
`;

export default function ReviewSorter (props) {
  const [ starRatings, setStarRatings ] = useState([]);
  const [ currentStarRating, setCurrentStarRating ] = useState(null)



  function starCategories() {
    let allStarRatings = [];
    for (let i = 5; i > 0; i--) {
      allStarRatings.push(
        <div key={i}>
          <Button
            // key={i}
            value={i}
            onClick={ props.setStarRatingFilter }
            // onClick={ (e)=> props.filterReviews(e) }

          >
          <StarRating
            rating={i}
          />
          </Button>
        </div>
      )
    }
    setStarRatings(allStarRatings);
  }

  useEffect(()=> {
    starCategories();
  }, [])

  return (
    starRatings ?
    <RDC> <br/>
      <Header> Sort by Rating: </Header>
      {starRatings}
      <button value={null} onClick={ props.setStarRatingFilter }> All Ratings </button>
    </RDC> :
    <div> Loading... </div>

  )
}
