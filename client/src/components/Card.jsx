import React from 'react';
import styled from 'styled-components';
import StarRating from './StarRating.jsx';
import RelatedAction from './RelatedAction.jsx';

const StyleCard = styled.div`
/* display: flex;
flex-direction: column; */
margin: 10px;
width: 200px;
height: 400px;
border: 1px solid;
padding: 10px;
`

const Image = styled.img`
  max-width: 180px;
  max-height: 380px;
`;

export default function Card ({product, setCurrentProduct, overviewProduct}) {

  //Will need url and pricing from styles another get request
  //All Get functions will prob be on a component level higher...

  return (
    <StyleCard id={product.id} >
      <RelatedAction product={product} overviewProduct={overviewProduct}/>
      <Image src={product.image} onClick={() => setCurrentProduct(product)}></Image>
      <h4>{product.category}</h4>
      <h2>{product.name}</h2>
      <h3>{product.salePrice ? product.sale_price : product.original_price}</h3>
      <StarRating rating={product.rating}/>
    </StyleCard>
  )


}