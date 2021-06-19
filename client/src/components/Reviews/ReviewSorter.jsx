import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRating from '../StarRating.jsx';
import { Line } from 'rc-progress';
import { HeaderDiv } from '../ReviewsContainer';


const RDC = styled.div`
  font-family: Helvetica, sans-serif;
  margin-left: 10px;
  margin-right: 10px;
  min-width: 240px;
`;

const Header = styled.div`
  font-size: large;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Button = styled.button`
  font-size: medium;
  font-weight: bold;
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export default function ReviewSorter (props) {
  const [ starRatings, setStarRatings ] = useState([]);
  const [ currentStarRating, setCurrentStarRating ] = useState(null)



  function starCategories() {
    let allStarRatings = [];
    for (let i = 5; i > 0; i--) {
      allStarRatings.push(
        <div key={i}>
          <br></br>
          <Button
            value={i}
            onClick={ props.setStarRatingFilter }
            name={`click to view only ${i}-star reviews`}
          >
          <StarRating
            rating={i}
          />
          &nbsp; {props.totalRatings[i]} Reviews
          <Line percent = {props.totalRatings[i]/props.totalRatings.total*100} strokeWidth={5} strokeColor={`#092677`} trailWidth={5} trailColor={'#b19f9f'}/>
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
      <br></br>
      <Button value={null} onClick={ props.setStarRatingFilter }> View All Ratings </Button>
    </RDC> :
    <div> Loading... </div>

  )
}
