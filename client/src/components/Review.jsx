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
  width: 800px;
`;

const UserAndDate = styled.div`
  font-family: Helvetica, sans-serif;
  margin: auto;
  font-size: medium;
  font-color: gray;
  text-align: right
`;

const Review = (props) => {
  return (
    <ContainerDiv>
    <UserAndDate>{props.reviewer_name} on {moment(props.date).calendar()}</UserAndDate>
        <TextDiv>  <StarRating rating={props.rating}/></TextDiv>
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