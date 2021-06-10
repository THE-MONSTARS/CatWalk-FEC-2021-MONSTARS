import React from 'react';
import styled from 'styled-components'
import moment from 'moment'
import StarRating from './StarRating.jsx'

const HeaderDiv = styled.div`
  color: blue;
  font-weight: bold;
  font-size: large;
  font-family: Helvetica, sans-serif;
  margin: none;
`;

const TextDiv = styled.div`
  font-family: Helvetica, sans-serif;
  border-width: 10px;
  margin: 3px;
`;

const ContainerDiv = styled.div`
  margin: 11px;
  border-bottom: 2px solid gray;
  border-color: gray; */
  padding: 10px;
  min-width: 400px;
  max-width: 800px;
`;

const UserAndDate = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: medium;
  color: gray;
`;

const StarUserDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Review = (props) => {
  return (
    <ContainerDiv>
      <StarUserDate>  <StarRating rating={props.rating}/>
      <UserAndDate>{props.reviewer_name} on {moment(props.date).calendar()}</UserAndDate>
      </StarUserDate>
        <HeaderDiv> {props.summary} </HeaderDiv>
        <TextDiv> {props.body} </TextDiv>
    </ContainerDiv>
  )
}


// const StyledReview = styled(Review)`
//   border-color: red;
//   font-weight: bold;
// `;

export default Review;