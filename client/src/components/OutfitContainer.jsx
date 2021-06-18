import React, {useState, useEffect} from 'react';
import Card from './Card.jsx';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';


const StyleCardAdd=styled.div`
display: flex;
position: relative;
flex-direction: column;
margin: 10px;
width: 250px;
height: 350px;
border: 1px solid;
padding: 10px;
&:hover {
  cursor: pointer;
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
      data.photos = currentStyle.photos;
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
    <Carousel responsive={responsive} centerMode={true}>
      <StyleCardAdd onClick={addOutfitCard}>Add to Outfit</StyleCardAdd>
      {outfitData.map((entry, index) => (
        <Card key={index} product={entry} isRelated={false} removeCard={removeCard}/>
      ))}
    </Carousel>
    </div>
  )
}