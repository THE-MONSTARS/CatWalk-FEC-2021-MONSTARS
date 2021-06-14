import React from 'react';
import styled from 'styled-components';
import StarRating from './StarRating.jsx';
import RelatedAction from './RelatedAction.jsx';

const StyleCard = styled.div`
display: flex;
flex-direction: column;
margin: 10px;
width: 200px;
border: 1px solid;
padding: 10px;
`

export default function Card ({product, setCurrentProduct}) {

  //Will need url and pricing from styles another get request
  //All Get functions will prob be on a component level higher...

  return (
    <StyleCard id={product.id} onClick={() => setCurrentProduct(product)}>
      <RelatedAction />
      <img src={product.image}></img>
      <h4>{product.category}</h4>
      <h2>{product.name}</h2>
      <h3>{product.salePrice ? product.sale_price : product.original_price}</h3>
      <StarRating rating={product.rating}/>
    </StyleCard>
  )


}