import React from 'react';
import StarRating from '../StarRating.jsx';
import styled from 'styled-components';


const Price = styled.span`
  color: ${ props => props.sale ? '#E76D83' : '#393D3F'};
`
const StruckThroughPrice = styled.span`
  text-decoration: line-through;
`

const ProductInformation = ({currentProduct, currentStyle}) => {
  const productName = currentProduct.name;
  const productCategory = currentProduct.category;
  const salePrice = currentStyle.sale_price;
  const originalPrice = currentStyle.original_price;


  return (
    <div>
      <StarRating />
      <p className="product-category">{productCategory}</p>
      <h2 className="product-name">{productName}</h2>
      <Price sale={salePrice}>{salePrice ? salePrice : originalPrice}</Price>
      {salePrice &&
      <StruckThroughPrice>{originalPrice}</StruckThroughPrice>}
    </div>
  )
};

export default ProductInformation;