import React from 'react';
import styled from 'styled-components';


const ImageGalleryContainer = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 60%;
  min-width: 0;
  justify-content: center;
  object-fit: cover;
`

const ProductImage = styled.img`
  max-height: 100%;
  min-width: 0;
  flex-shrink: 1;
`

const ImageGallery = ({currentStyle}) => {
  return (
    <ImageGalleryContainer>
      {currentStyle && <ProductImage src={currentStyle.photos[0].url} />}
    </ImageGalleryContainer>
  )
}

export default ImageGallery;