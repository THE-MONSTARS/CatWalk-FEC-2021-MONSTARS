import React, {useState, useEffect} from 'react';
import Card from './Card.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import styled from 'styled-components';

SwiperCore.use([Navigation, Pagination])

const AddIcon = '../assets/add_circle_outline_black_24dp.svg';

const AddIconImg = styled.img`
width: 50%;
height: 50%;
`

const StyleCardAdd = styled.div`
display: flex;
position: relative;
flex-direction: column;
margin: 10px;
width: 250px;
height: 350px;
border: 1px solid;
padding: 10px;
justify-content: center;
align-items: center;
`

const OutfitSlider = styled(Swiper)`
  .swiper-wrapper {
    width: 1200px;
    minHeight: '400px';
    display: flex;
    transition: all 0.2s;
  }

  .swiper-button-disabled {
    opacity: 0;
  }

  .swiper-button-next, .swiper-button-prev {
    position: absolute;
    outline: 0;
    border-radius: 35px;
    z-index: 1000;
    border: 0;
    background: rgba(0, 0, 0, 0.5);
    min-width: 43px;
    min-height: 43px;
    cursor: pointer;
    right: 40px;
  }

  .swiper-button-prev {
    left: 40px;
  }

  .swiper-button-prev:after, .swiper-button-next:after {
    font-size: 20px;
    color: white;
  }
  .swiper-pagination-bullets {
    display: none;

  }
`

export default function OutfitContainer ({currentProduct,currentStyle,reviews}) {
  const [outfitData, setOutfitData] = useState([]);


  const getLocalData = () => {
    let localOutfitData = localStorage.getItem('userOutfitData');
    if (!localOutfitData) {
      localOutfitData = [];
    } else {
      localOutfitData = JSON.parse(localOutfitData);
    }
    setOutfitData(localOutfitData);
  }

  const removeCard = (id) => {
    let newData = outfitData.filter(entry=> entry.id !== id);
    setOutfitData(newData);
    localStorage.setItem('userOutfitData', JSON.stringify(newData))
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1000 },
      items: 3,
      slidesToSlide: 1
    }
  }
  const addOutfitCard = () => {
    if(!outfitData.some(entry=>entry.id === currentProduct.id)) {
      let data = {};
      data.name = currentProduct.name;
      data.id = currentProduct.id;
      data.category = currentProduct.category;
      data.original_price = currentStyle.original_price;
      data.sale_price = currentStyle.sale_price;
      data.image = currentStyle.photos[0].thumbnail_url;
      data.rating = getAverageRating();
      setOutfitData(outfitData => {
        localStorage.setItem('userOutfitData', JSON.stringify([...outfitData, data]))
        return [...outfitData, data]
      });
    }
  }

  useEffect(()=>{
    getLocalData();
  },[])

  const getAverageRating = () => {
    return reviews.reduce((acc, review) => {
      return acc + review.rating
    }, 0) / reviews.length;
  }

  return (
    <div style={{width: '1200px', minHeight: '400px'}}>
    <span style={{padding: "10px"}}>OUTFITS</span>
    <OutfitSlider navigation pagination spaceBetween={0} slidesPerView={4}>
      <SwiperSlide key={0}>
        <StyleCardAdd onClick={addOutfitCard}>Add to Outfit
        <AddIconImg src={AddIcon} />
        </StyleCardAdd>
      </SwiperSlide>
      {outfitData.map((entry, index) => (
        <SwiperSlide key={index+1}>
          <Card key={index} product={entry} isRelated={false} removeCard={removeCard}/>
        </SwiperSlide>
      ))}
    </OutfitSlider>
    </div>
  )
}