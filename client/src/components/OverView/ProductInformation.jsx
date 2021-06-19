import React, { useState, useEffect } from 'react';
import StarRating from '../StarRating.jsx';
import styled from 'styled-components';

const ProductInfoContainer = styled.div`
  width: 100%;
`

const RatingsContainer = styled.div`
  display: flex;
  align-items: center;
`

const GoToReviews = styled.p`
  font-family: 'Roboto';
  font-size: 10px;
  margin-left: 5px;
  text-decoration: underline;
  &:hover {
    color: blue;
    cursor: pointer;
  }
`

const ProductCategory = styled.p`
  margin-top: 10px;
  font-size: 14px;
  font-family: 'Roboto';
  color: #343a40;
`

const ProductName = styled.h3`
  margin-top: 4px;
  margin-bottom: 12px;
  font-family: 'Bebas Neue', cursive;
  color: #343a40;
  font-size: 40px;
`

const Price = styled.span`
  margin-top: 10px;
  /* font-family: 'Montserrat', sans-serif; */
  font-family: 'Roboto';
  color: #343a40;
  color: ${ props => props.sale ? '#E76D83' : '#393D3F'};
`

const StruckThroughPrice = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  margin-left: 10px;
  text-decoration: line-through;
`

const ProductInformation = ({currentProduct, currentStyle, averageRating, handleScrollToRef}) => {
  const productName = currentProduct.name;
  const productCategory = currentProduct.category;
  const salePrice = currentStyle.sale_price;
  const originalPrice = currentStyle.original_price;

  return (
    <ProductInfoContainer>
      <RatingsContainer>
        <StarRating rating={averageRating}/>
        <GoToReviews onClick={() => handleScrollToRef()}>Read all reviews</GoToReviews>
      </RatingsContainer>

      <ProductCategory>{productCategory}</ProductCategory>
      <ProductName>{productName}</ProductName>
      <Price sale={salePrice}>{salePrice ? salePrice : originalPrice}</Price>
      {salePrice &&
      <StruckThroughPrice>{originalPrice}</StruckThroughPrice>}
    </ProductInfoContainer>
  )
};

export default ProductInformation;