import React from 'react';
import StarRating from '../StarRating.jsx';

const ProductInformation = () => (
  <div>
    <StarRating />
    <p className="product-category">Product Category</p>
    <h2 className="product-name">Product Name</h2>
     {/* <Price /> */}
  </div>
);

export default ProductInformation;