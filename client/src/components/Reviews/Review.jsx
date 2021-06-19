import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import moment from 'moment'
import StarRating from '../StarRating.jsx'
import ReviewThumbs from './ReviewThumbs.jsx'

const HeaderDiv = styled.div`
  color: Black;
  font-weight: bold;
  font-size: large;
  font-family: 'Bebas Neue';
  letter-spacing: 1px;
  margin: none;
`;

const TextDiv = styled.div`
  font-family: 'Roboto';
  border-width: 10px;
  margin: 3px;
`;

const ContainerDiv = styled.div`
  margin: 11px;
  border-bottom: 2px solid gray;
  border-color: 3a3a3a
  padding: 10px;
  width: 100%;
  min-width: 400px;
  max-width: 600px;
`;

const StarUserDate = styled.div`
font-family: 'Roboto';
font-weight: bold;
font-size: medium;
color: #3a3a3a;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Helpful = styled.div`
  color: #3a3a3a;
`;

const TextLink = styled.a`
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

export default function Review (props) {
  const [ helpfulness, setHelpfulness] = useState(props.helpfulness)
  const [ unhelpfulness, setUnhelpfulness ] = useState(0)
  const [ selectedHelpfulness, setSelectedHelpfulness ] = useState(false)

  function incrementHelpfulness(e) {
    if (!selectedHelpfulness) {
      e.target.style.fontWeight ='bold';
      console.log(Number(e.target))
      setHelpfulness(props.helpfulness + 1)
      setSelectedHelpfulness(true)
    }
  }

  function decrementHelpfulness(e) {
    if (!selectedHelpfulness) {
      e.target.style.fontWeight ='bold';
      setHelpfulness(props.helpfulness - 1)
      setSelectedHelpfulness(true)
    }
  }

  return (
    <ContainerDiv>
      <StarUserDate>
        <StarRating rating={props.rating}/>
        {props.reviewer_name} on {moment(props.date).calendar()}
      </StarUserDate>
        <HeaderDiv> {props.summary} </HeaderDiv>
        <TextDiv> {props.body} </TextDiv>
        <br></br>
          {props.recommend &&
            <TextDiv><img src={'../assets/icons8-checkmark-24.png'} />
             "yes, I recommend this product"
            </TextDiv>
          }
          {props.response &&
            <TextDiv>
              Response from Seller: {props.response}
            </TextDiv>
          }
        <ReviewThumbs
          name={`Review photos`}
          photos={props.photos}
          selectPhoto={props.selectPhoto}
          selectedPhoto={props.selectedPhoto}
        />
        <br></br>
        <Helpful> Helpful? &nbsp; <TextLink value={1} onClick={incrementHelpfulness}> Yes </TextLink> &nbsp;
            ({helpfulness}) &nbsp;
            <TextLink value={-1} onClick={decrementHelpfulness}> No </TextLink> &nbsp;
            &nbsp; | &nbsp; <TextLink>  Report  </TextLink>
        </Helpful>
        <br></br>
    </ContainerDiv>
  )
}