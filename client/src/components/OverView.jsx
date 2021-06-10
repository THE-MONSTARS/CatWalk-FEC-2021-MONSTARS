import React, {useState, useEffect} from 'react';
import ImageGallery from './OverView/ImageGallery.jsx';
import ProductInformation from './OverView/ProductInformation.jsx';
import StyleSelector from './OverView/StyleSelector.jsx';
import AddToCart from './OverView/AddToCart.jsx';
import ProductDescription from './OverView/ProductDescription.jsx';
import styled from 'styled-components';


const OverViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 450px;
`

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const OverView = ({currentProduct, styles, getStyles}) => {
  const [ currentStyle, setCurrentStyle ] = useState(styles[0])

  const selectStyle = (id) => {
    const current = styles.find(style => style.style_id === parseInt(id))
    setCurrentStyle(current)
  }

  return (
    <div>
      <OverViewContainer>
        <ImageGallery currentStyle={currentStyle}/>
        <ProductInfoContainer>
          <ProductInformation currentStyle={currentStyle}/>
          <StyleSelector styles={styles} currentStyle={currentStyle} selectStyle={selectStyle}/>
          <AddToCart />
        </ProductInfoContainer>
      </OverViewContainer>

      <ProductDescription />
    </div>
  )
}

export default OverView;
