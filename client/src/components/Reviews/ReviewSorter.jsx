import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRating from '../StarRating.jsx';

const RDC = styled.div`
  font-family: Helvetica, sans-serif;
  margin-left: 10px;
  margin-right: 10px;
<<<<<<< HEAD
  min-width: 140px;
=======

>>>>>>> 3320ce9e56f25d8dc9f4ee8ef2fb4962ff3a3366
`;

const Header = styled.div`
  font-size: medium;
  font-weight: bold;
  margin-bottom: 5px;
`;



export default function ReviewSorter (props) {
  const [ starRatings, setStarRatings ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  function filterReviews(e) {
    e.preventDefault();
    console.log('clicked', e.target)
  }

  function starCategories() {
    let allStarRatings = [];
    for (let i = 5; i > 0; i--) {
      allStarRatings.push(<div key={i}> <StarRating rating={i} onClick={filterReviews}/> </div>)
    }
    setStarRatings(allStarRatings);
    setIsLoading(false);
  }

  useEffect(()=> {
    starCategories();
  }, [])

  return (
    isLoading ?
    <div> Loading... </div> :
    <RDC> <br/>
      <Header> Sort by Rating: </Header>
      {starRatings}
    </RDC>
  )
}
