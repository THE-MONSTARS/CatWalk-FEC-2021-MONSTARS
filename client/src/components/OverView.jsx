import React, {useState, useEffect} from 'react';
import ImageGallery from './OverView/ImageGallery.jsx';
import ProductInformation from './OverView/ProductInformation.jsx';
import StyleSelector from './OverView/StyleSelector.jsx';
import AddToCart from './OverView/AddToCart.jsx';
import ProductDescription from './OverView/ProductDescription.jsx';
import styled from 'styled-components';
import useEffectAfterRender from './utils/useEffectAfterRender.jsx';


const OverViewContainer = styled.div`
  border: 1px solid black;
  /* overflow: hidden; */
  display: flex;
  /* flex-direction: row; */
  /* min-width: 600px; */
  max-width: 800px;
  height: 450px;
`

const ProductContainer = styled.div`
  border: 1px solid green;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 30%;
`

const OverView = ({currentProduct, styles, currentStyle, setCurrentStyle, getStyles, reviews}) => {

  const selectStyle = (id) => {
    const current = styles.find(style => style.style_id === parseInt(id))
    setCurrentStyle(current)
  }

  return (
    <React.Fragment>
      <OverViewContainer>
        <ImageGallery currentStyle={currentStyle}/>
        <ProductContainer>
          <ProductInformation currentProduct={currentProduct} currentStyle={currentStyle} reviews={reviews}/>
          <StyleSelector styles={styles} currentStyle={currentStyle} selectStyle={selectStyle}/>
          <AddToCart currentStyle={currentStyle}/>
        </ProductContainer>
      </OverViewContainer>

      <ProductDescription currentProduct={currentProduct} />
    </React.Fragment>
  )
}

export default OverView;
