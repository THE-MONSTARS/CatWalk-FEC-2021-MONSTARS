import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// import YellowStar from '../assets/icons8-star-48-yellow.png'

const YellowStar = (props) => (<img src={'../assets/icons8-star-24-yellow.png'}/>)

const EmptyStar = (props) => (<img src={'../assets/icons8-star-24-empty.png'}/>)

const StarRating = (props) => {
  const [ stars, setStars ] = useState([]);

  function displayStars(stars) {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      (i < stars) ?
      starArray.push(<YellowStar key={i}/>) :
      starArray.push(<EmptyStar key={i}/>)
    }
    setStars(starArray)
  }

  useEffect(() => {
    displayStars(props.rating)
  }, [])

  function handleClick(e) {
    e.preventDefault()
    console.log(props.rating)
  }

  return (
    stars?
      <a /*onClick={props.filterReviews} */> {stars} </a> :
      <a> ... </a>
  );
}



export default StarRating;