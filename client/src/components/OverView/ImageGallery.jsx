import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Thumbs, Keyboard, Controller } from 'swiper';
import 'swiper/swiper-bundle.css';
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

SwiperCore.use([Navigation, Pagination, Thumbs, Keyboard, Controller])

const GalleriesHolder = styled.div`
  display: flex;
  align-items: flex-start;
`
// containers
const ThumbsGalleryContainer = styled.div`
  width: 80px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MainGalleryContainer = styled.div`
  height: 100%;
  display: flex;
`

// Swiper instances
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
    background: #EEEEEE;
  }
  .swiper-slide img {
	  object-fit: cover;
  }
`
const ThumbsGallery = styled(Swiper)`
  height: 100%;
  &.swiper-container-thumbs {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .swiper-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 300px;
    width: 70px;
  }
  .swiper-button-next {
    position: relative;
    height: 10px;
    top: 337px;
    left: 36px;
    transform: rotate(90deg);
  }
  .swiper-slide {
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    width: 50px;
    justify-content: center;
  }
  .swiper-slide-thumb-active {
    box-shadow: 0px 2.5px 10px #1d62bd;
    transition: all 0.2s ease 0s;
  }
  .swiper-slide img {
    padding: 0;
    box-shadow: 2px 2px 3px 0px #4d4f50;
	  object-fit: cover;
	  width: 100%;
	  height: 100%;
    &:hover {
      cursor: pointer;
      box-shadow:  1px 1px 2px 0.3px #1d62bd;
    }
  }
`
const ExpandedGallery = styled(Swiper)`
  height: 100%;
  width: 80vw;
  position: absolute;
  .swiper-wrapper {
    width: 500px;
    display: flex;
    transition: all 0.2s;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    overflow: hidden;
    background: #EEEEEE;
  }
  .swiper-slide img {
	  object-fit: cover;
  }
  .swiper-button-disabled {
    opacity: 0;
  }
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 2000ms ease-in-out;
  }
  .ReactModal__Overlay--after-open{
    opacity: 1;
  }
  .ReactModal__Overlay--before-close{
    opacity: 0;
  }
`

// Nav buttons
const CleanButton = styled.button`
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
`
// Thumbs Nav
const ThumbsNav = styled(CleanButton)`
  &.swiper-button-disabled {
    opacity: 0;
  }
  height: 20px;
`
const ThumbsPreviousButton = styled(ThumbsNav)`
  transform: rotate(90deg);
  padding-top: 2px;
`
const ThumbsNextButton = styled(ThumbsNav)`
  transform: rotate(-90deg);
`


// Main Nav
const MainNav = styled(CleanButton)`
  position: relative;
  z-index: 10;
  &.swiper-button-disabled {
    opacity: 0;
  }
  img {
    width: 40px;
  }
`
const MainPreviousButton = styled(MainNav)`
  left: 50px;
`
const MainNextButton = styled(MainNav)`
  right: 50px;
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
  const [ mainSwiper, setMainSwiper ] = useState(null);
  const [ expandedSwiper, setExpandedSwiper ] = useState(null);
  const [ expanded, setExpanded ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ currentSlide, setCurrentSlide ] = useState(0);
  const sizeRef = useRef(null)

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

  const toggleExpandedView = () => {
    setIsOpen(prev => !prev);
  }


  return (
    <GalleriesHolder>
      <ThumbsGalleryContainer>
        <ThumbsPreviousButton type="button" className="swiper-navigation-prev">
          <img src ="/assets/left-arrow.png"/>
        </ThumbsPreviousButton>

        <ThumbsGallery
          id="thumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={7}
          direction={'vertical'}
          navigation={{
            nextEl: ".swiper-navigation-next",
            prevEl: ".swiper-navigation-prev"
          }}
        >
          {thumbSlides}
        </ThumbsGallery>

        <ThumbsNextButton type="button" className="swiper-navigation-next">
          <img src ="/assets/left-arrow.png" />
        </ThumbsNextButton>
      </ThumbsGalleryContainer>

      <MainGalleryContainer>
        <MainPreviousButton type="button" className="main-navigation-prev">
          <img src ="/assets/main-left-nav.png" />
        </MainPreviousButton>

        <MainGallery
          id="main"
          onSwiper={setMainSwiper}
          thumbs={ {swiper: thumbsSwiper} }
          slideToClickedSlide={true}
          onClick={() => setIsOpen(true)}
          onActiveIndexChange={() => setCurrentSlide(mainSwiper.activeIndex)}
          keyboard
          navigation={{
            nextEl: ".main-navigation-next",
            prevEl: ".main-navigation-prev"
          }}
          pagination
        >
          {slides}
        </MainGallery>

        <MainNextButton type="button" className="main-navigation-next">
          <img src ="/assets/main-right-nav.png" />
        </MainNextButton>
      </MainGalleryContainer>

      <Modal
        isOpen={isOpen}
        onSwiper={setExpandedSwiper}
        onEscapeKeydown={() => setIsOpen(false)}
        closeTimeoutMS={500}
      >
        <ExpandedGallery
          id="expanded"
          ref={sizeRef}
          controller={{ control: mainSwiper }}
          navigation
          initialSlide={currentSlide}

        >
            {slides}
        </ExpandedGallery>
      </Modal>


    </GalleriesHolder>
  )
}

export default ImageGallery;
