import React from 'react';
import StarRating from '../StarRating.jsx';
import styled from 'styled-components';


const Price = styled.span`
  color: ${ props => props.onSale ? '#E76D83' : '#393D3F'};
`
const StruckThroughPrice = styled.span`
  text-decoration: line-through;
`

const ProductInformation = ({currentStyle}) => {
  const salePrice = currentStyle.sale_price;
  const originalPrice = currentStyle.original_price;

  return (
    <div>
      <StarRating />
      <p className="product-category">Product Category</p>
      <h2 className="product-name">Product Name</h2>
      <Price onSale={salePrice}>{salePrice ? salePrice : originalPrice}</Price>
      {salePrice &&
      <StruckThroughPrice>{originalPrice}</StruckThroughPrice>}
    </div>
  )
};

export default ProductInformation;