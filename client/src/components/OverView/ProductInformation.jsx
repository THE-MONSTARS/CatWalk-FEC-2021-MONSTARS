import React from 'react';
import StarRating from './StarRating.jsx';

const ProductInformation = () = > (
  <div>
    <StarRating />
    <p className="product-category"></p>
    <h2 className="product-name"></h2>
     {/* <Price /> */}
  </div>
);

export default ProductInformation;