import React from 'react';
import styled from 'styled-components';
import StarRating from './StarRating.jsx';
import RelatedAction from './RelatedAction.jsx';

const StyleCard=styled.div`
display: flex;
position: relative;
flex-direction: column;
margin: 10px;
width: 250px;
height: 350px;
border: 1px solid;
padding: 10px;
`

const StyleName=styled.h2`
font-family: 'Roboto-Bold';
padding: 5px 0;
`

export default function Card ({product, setCurrentProduct, overviewProduct, isRelated, removeCard}) {
   const image = product.photos[0].thumbnail_url;

  //Will need url and pricing from styles another get request
  //All Get functions will prob be on a component level higher...

  return (
    <StyleCard id={product.id} >
      <div style={{width: "100%", height: "75%"}}>
      <RelatedAction product={product} overviewProduct={overviewProduct} related={isRelated} removeCard={removeCard}/>
      {isRelated ?
      <img style={{objectFit: "cover", width: "250px", height: "262.5px"}} src={image} onClick={() => setCurrentProduct(product)}></img> :
      <img style={{objectFit: "cover", width: "250px", height: "262.5px"}} src={image}></img>
      }
      </div>
      <div>
      <h4>{product.category}</h4>
      <StyleName>{product.name}</StyleName>
      <h3>{product.salePrice ? product.sale_price : product.original_price}</h3>
      <StarRating rating={product.rating}/>
      </div>
    </StyleCard>
  )


}