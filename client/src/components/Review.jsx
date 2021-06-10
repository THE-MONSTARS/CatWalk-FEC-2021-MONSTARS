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
`;

const ContainerDiv = styled.div`
  margin: 10px;
  border-style: solid;
  border-color: blue;
  padding: 10px;
`;

const Review = (props) => {
  return (
    <ContainerDiv>
        <HeaderDiv> {props.summary} </HeaderDiv>
        <TextDiv> Reviewer Name: {props.reviewer_name} </TextDiv>
        <TextDiv> Rating: <StarRating rating={props.rating}/></TextDiv>
        <TextDiv> Review: {props.body} </TextDiv>
        <TextDiv> Date of Review: {moment(props.date).calendar()} </TextDiv>
    </ContainerDiv>
  )
}


// const StyledReview = styled(Review)`
//   border-color: red;
//   font-weight: bold;
// `;

export default Review;