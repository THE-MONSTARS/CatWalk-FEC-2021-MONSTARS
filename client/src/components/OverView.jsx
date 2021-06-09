import React, {useState, useEffect} from 'react';
import ImageGallery from './OverView/ImageGallery.jsx';
import ProductInformation from './OverView/ProductInformation.jsx';
import StyleSelector from './OverView/StyleSelector.jsx';
import AddToCart from './OverView/AddToCart.jsx';
import ProductDescription from './OverView/ProductDescription.jsx';

const OverView = ({currentProduct, styles, getStyles}) => {
  const [ currentStyle, setCurrentStyle ] = useState({})

  const selectStyle = (id) => {
    const current = styles.find(style => style.style_id === parseInt(id))
    setCurrentStyle(current)
  }

  return (
    <div>
      <ImageGallery />
      <div className="container-column product-info">
        <ProductInformation />
        <StyleSelector styles={styles} selectStyle={selectStyle}/>
        <AddToCart />
      </div>
      <ProductDescription />
    </div>
  )
}

export default OverView;
