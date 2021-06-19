import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRating from '../StarRating.jsx';
import { Line } from 'rc-progress';
import { HeaderDiv } from '../ReviewsContainer';
import { DefaultWidth, Header, Button } from './styles'


const ReviewDivContainer = styled.div`
  font-family: Helvetica, sans-serif;
  margin-left: 10px;
  margin-right: 10px;
  width: 450px;
`;

const SingleLine = styled.div`
display: inline-flex;
flex-direction: row;
flex-wrap: nowrap;
min-width: 300px;
align-items: center;
justify-content: center;
line-height: 1px;
`;

export default function ReviewSorter (props) {
  const [ starRatings, setStarRatings ] = useState([]);
  const [ currentStarRating, setCurrentStarRating ] = useState(null)

  function starCategories() {
    let allStarRatings = [];
    for (let i = 5; i > 0; i--) {
      allStarRatings.push(
        <Button
          key={i}
          value={i}
          onClick={ props.setStarRatingFilter }
          name={`click to view only ${i}-star reviews`}
          >
          <StarRating
            rating={i}
            />
            <SingleLine>
              <Line percent={props.totalRatings[i]/props.totalRatings.total*100} strokeWidth={5} strokeColor={`#092677`} trailWidth={5} trailColor={'#b19f9f'}/>
              &nbsp; {props.totalRatings[i]}
            </SingleLine>
        </Button>
      )
    }
    setStarRatings(allStarRatings);
  }

  useEffect(()=> {
    starCategories();
  }, [])

  return (
    starRatings ?
    <ReviewDivContainer>
      <Header> Sort by Rating: </Header>
      {starRatings}
      <br></br>
      <Button value={null} onClick={ props.setStarRatingFilter }> View All Ratings </Button>
    </ReviewDivContainer> :
    <div> Loading... </div>
  )
}
