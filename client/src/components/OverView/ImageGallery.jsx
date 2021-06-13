import React from 'react';
import styled from 'styled-components';


const ImageGalleryContainer = styled.div`
  position: relative;
  /* overflow: hidden; */
  /* display: flex; */
  /* align-items: center; */
  width: 50%;
  height: 100%;
  /* max-width: 100%; */
  /* height: 0; */
  /* padding-bottom: 75%; */
  /* min-width: 0; */
  /* justify-content: center; */

`

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* max-height: 100%; */
  /* min-width: 0; */
  /* flex-shrink: 1; */
  object-fit: cover;

`

const ImageGallery = ({currentStyle}) => {
  return (
    <ImageGalleryContainer>
      {currentStyle && <ProductImage src={currentStyle.photos[0].url} />}
    </ImageGalleryContainer>
  )
}

export default ImageGallery;