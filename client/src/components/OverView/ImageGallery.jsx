import React from 'react';
import styled from 'styled-components';


const ImageGalleryContainer = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 60%;
  min-width: 0;
  justify-content: center;
  object-fit: contain;
`

const ProductImage = styled.img`
  height: 100%;
  min-width: 0;
`


const ImageGallery = ({currentStyle}) => {
  console.log(currentStyle)

  return (
    <ImageGalleryContainer>
      {currentStyle && <ProductImage src={currentStyle.photos[0].url} />}
    </ImageGalleryContainer>
  )
}

export default ImageGallery;