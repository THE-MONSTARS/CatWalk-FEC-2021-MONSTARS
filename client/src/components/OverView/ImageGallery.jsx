import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination])


const ScrollingGallery = styled(Swiper)`
  /* &.swiper-container { } */
  .swiper-wrapper {
    width: 500px;
    display: flex;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
  }
  .swiper-slide img {
	  object-fit: contain;
	  /* width: 100%; */
	  height: 100%;
  }
  .swiper-button-disabled {
    opacity: 0;
  }
`

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* height: 100%; */
  /* max-height: 100%; */
  /* min-width: 0; */
  /* flex-shrink: 1; */
  object-fit: cover;

`

const ImageGallery = ({currentStyle}) => {

  const slides = currentStyle.photos.map((photo, idx) => {
    return (
      <SwiperSlide key={idx}>
        <img src={photo.url}/>
      </SwiperSlide>
    )
  })

  return (
    <>
      <ScrollingGallery
        id="main"
        slideToClickedSlide={true}
        spaceBetween={30}
        navigation
        pagination
      >
        {slides}
      </ScrollingGallery>
    </>
  )
}

export default ImageGallery;
