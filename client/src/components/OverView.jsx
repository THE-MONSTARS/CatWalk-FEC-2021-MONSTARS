import React, {setState, useEffect} from 'react';
import ImageGallery from './OverView/ImageGallery.jsx';
import ProductInformation from './OverView/ProductInformation.jsx';
import StyleSelector from './OverView/StyleSelector.jsx';
import AddToCart from './OverView/AddToCart.jsx';
import ProductDescription from './OverView/ProductDescription.jsx';

const OverView = () => (
  <div>
    <ImageGallery />
    <div className="container-column product-info">
      <ProductInformation />
      <StyleSelector />
      <AddToCart />
    </div>
    <ProductDescription />
  </div>
)

export default OverView;
