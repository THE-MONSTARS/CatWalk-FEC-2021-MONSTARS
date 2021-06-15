import React from 'react';
import StarRating from '../StarRating.jsx';
import styled from 'styled-components';

const ProductInfoContainer = styled.div`
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

const ProductInformation = ({currentProduct, currentStyle, reviews}) => {
  const productName = currentProduct.name;
  const productCategory = currentProduct.category;
  const salePrice = currentStyle.sale_price;
  const originalPrice = currentStyle.original_price;

  const averageRating = reviews.reduce((acc, review) => {
    return acc + review.rating
  }, 0) / reviews.length;

  return (
    <ProductInfoContainer>
      <StarRating rating={averageRating}/>
      <ProductCategory>{productCategory}</ProductCategory>
      <ProductName>{productName}</ProductName>
      <Price sale={salePrice}>{salePrice ? salePrice : originalPrice}</Price>
      {salePrice &&
      <StruckThroughPrice>{originalPrice}</StruckThroughPrice>}
    </ProductInfoContainer>
  )
};

export default ProductInformation;