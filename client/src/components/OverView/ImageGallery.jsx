import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Thumbs, Keyboard, Controller, Zoom } from 'swiper';
import 'swiper/swiper-bundle.css';
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

SwiperCore.use([Navigation, Pagination, Thumbs, Keyboard, Controller, Zoom])

const GalleriesHolder = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
`
// containers
const ThumbsGalleryContainer = styled.div`
  width: 80px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 1;
  position: relative;
  left: 30px;
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
    /* background: #EEEEEE; */
  }
  .swiper-slide img {
	  object-fit: contain;
    flex-grow: 1;
    flex-shrink: 1;
  }
  &:hover {
    cursor: zoom-in;
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
  height: 100vh;

  position: absolute;
  .swiper-wrapper {
    display: flex;
    flex-shrink: 1;
    width: 80vw;
    transition: all 0.2s;
  }
  .swiper-slide {
    display: flex;
    flex-grow: 1;
    flex-basis: 100%;
    justify-content: center;
    overflow: hidden;
    background: none;
    &:hover {
      cursor: crosshair;
      box-shadow:  1px 1px 2px 0.3px #1d62bd;
    }
  }
  .swiper-slide img {
	  object-fit: contain;
    flex-grow: 1;
    flex-shrink: 1;

  }
  .swiper-slide-zoomed {
    &:hover {
      cursor: zoom-out;
      box-shadow:  1px 1px 2px 0.3px #1d62bd;
      /* transform: translate3d(${(props) => props.mouseposition[0]}px, ${(props) => props.mouseposition[1]}px, 0px); */
    }
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



const ExpandedModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => props.opacity};
  transition: all 0.2s ease;
`

const ImageGallery = ({currentStyle}) => {
  const [ thumbsSwiper, setThumbsSwiper ] = useState(null);
  const [ mainSwiper, setMainSwiper ] = useState(null);
  const [ expandedSwiper, setExpandedSwiper ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ currentSlide, setCurrentSlide ] = useState(0);
  const [ modalOpacity, setModalOpacity ] = useState(0);
  const [ [ mouseX, mouseY ] , setMousePosition ] = useState([0, 0])
  const imageRef = useRef(null)


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

  const zoomSlides = currentStyle.photos.map((photo, idx) => (
    <SwiperSlide key={idx}>
      <div
        className="swiper-zoom-container"
        data-swiper-zoom="2.5"
        onMouseMove={e => handleMouseMove(e)}
      >
        <img src={photo.url}
          style={{
            transformOrigin: `${mouseX}% ${mouseY}%`
          }}
        />
      </div>
    </SwiperSlide>
  ))

  const toggleExpandedView = () => {
    setIsOpen(prev => !prev);
  }

  const handleMouseMove = (e) => {
    const { left: offsetLeft, top: offsetTop } = imageRef.current.getBoundingClientRect();
    const { innerWidth: width, innerHeight: height } = window;
    const x = ((e.nativeEvent.clientX - offsetLeft) / parseInt(width, 10)) * 100;
    const y = ((e.nativeEvent.clientY - offsetTop) / parseInt(height, 10)) * 100;
    setMousePosition([ x, y ])
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
          <img src ="/assets/main-left-nav.png"/>
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

      <ExpandedModal
        isOpen={isOpen}
        onEscapeKeydown={() => setIsOpen(false)}
        closeTimeoutMS={500}
        onBackgroundClick={() => setIsOpen(false)}
        afterOpen={() => setModalOpacity(1)}
        afterClose={() => setModalOpacity(0)}
        opacity={modalOpacity}
      >
        <ExpandedGallery
          ref={imageRef}
          id="expanded"
          onSwiper={setExpandedSwiper}
          controller={{ control: mainSwiper }}
          navigation
          initialSlide={currentSlide}
          keyboard
          // zoom={true}
          allowTouchMove={false}
          onClick={() => expandedSwiper.zoom.toggle()}
        >
            {zoomSlides}
        </ExpandedGallery>
      </ExpandedModal>


    </GalleriesHolder>
  )
}

export default ImageGallery;
