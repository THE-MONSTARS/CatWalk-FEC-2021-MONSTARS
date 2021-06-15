import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Thumbs, Keyboard } from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Thumbs, Keyboard])

const OverViewContainer = styled.div`
  display: flex;

  /* background: #DDDDDD; */
`

const GalleriesHolder = styled.div`
  position: relative;
`

const ThumbsGalleryContainer = styled.div`
  width: 80px;
  height: 200px;
`

const MainGallery = styled(Swiper)`
height: 100%;
  .swiper-wrapper {
    width: 500px;
    display: flex;
    transition: all 0.2s;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  .swiper-slide img {
	  object-fit: contain;
	  height: 100%;
  }
  .swiper-button-disabled {
    opacity: 0;
  }
`

const ThumbsGallery = styled(Swiper)`
  position: absolute;
  top: 10px;
  /* left: 5px; */
  .swiper-container-thumbs {
    width: 100px;
  }
  .swiper-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 300px;
    width: 70px;
  }

  .swiper-button-prev {
    position: relative;
    top: 10px;
    left: 21px;
    transform: rotate(90deg);
  }
  .swiper-button-prev:after {
    width: 15px;
  }
  .swiper-button-next {
    position: relative;
    top: 300px;
    left: 21px;
    transform: rotate(90deg);
  }
  .swiper-slide {
    display: flex;
    flex-shrink: 0;
    /* height: 40px; */
    width: 50px;
    justify-content: center;
  }
  .swiper-slide-thumb-active {
    box-shadow: 0px 2.5px 10px #1d62bd;
    /* -webkit-box-shadow: 0px 5px 40px -10px #6d97ce; */
    /* -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57); */
    transition: all 0.2s ease 0s;
  }
  .swiper-slide img {
    border: 1px solid #343a40;
	  object-fit: cover;
	  width: 100%;
	  height: 100%;
    &:hover {
      cursor: pointer;
      box-shadow:  1px 1px 2px 0.3px #1d62bd
    }
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
  object-fit: cover;

`

const ImageGallery = ({currentStyle}) => {
  const [ thumbsSwiper, setThumbsSwiper ] = useState(null);

  const slides = currentStyle.photos.map((photo, idx) => (
    <SwiperSlide key={idx}>
      <img src={photo.url}/>
    </SwiperSlide>
  ));

  const thumbSlides = currentStyle.photos.map((photo, idx) => (
    <SwiperSlide key={idx}>
      <img src={photo.thumbnail_url}/>
    </SwiperSlide>
  ));


  return (
    <OverViewContainer>
      <ThumbsGalleryContainer>
        <ThumbsGallery
          id="thumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={7}
          direction={'vertical'}
          navigation
        >
          {thumbSlides}
        </ThumbsGallery>
      </ThumbsGalleryContainer>

      <MainGallery
        id="main"
        thumbs={ {swiper: thumbsSwiper} }
        slideToClickedSlide={true}
        keyboard
        navigation
        pagination
      >
        {slides}
      </MainGallery>

    </OverViewContainer>
  )
}

export default ImageGallery;
