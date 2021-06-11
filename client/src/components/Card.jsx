import React from 'react';
import styled from 'styled-components';
import StarRating from './StarRating.jsx';

const StyleCard = styled.div`
display: flex;
flex-direction: column;
margin: 10px;
width: 200px;
border: 1px solid;
padding: 10px;
`

export default function Card (props) {

  //Will need url and pricing from styles another get request
  //All Get functions will prob be on a component level higher...

  return (
    <StyleCard>
      <p>Some overlay action Component</p>
      <img src={props.img}></img>
      <h4>{props.category}</h4>
      <h2>{props.name}</h2>
      <h3>{props.salePrice ? props.salePrice : props.orginalPrice}</h3>
      <StarRating rating={props.rating}/>
    </StyleCard>
  )


}