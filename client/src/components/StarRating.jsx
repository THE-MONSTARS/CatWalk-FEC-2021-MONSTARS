import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// import YellowStar from '../assets/icons8-star-48-yellow.png'

const YellowStar = (props) => (<img src={'../assets/icons8-star-24-yellow.png'}/>)

const EmptyStar = (props) => (<img src={'../assets/icons8-star-24-empty.png'}/>)

const SA = styled.a`
  z-index: -1;
  position: relative;
`;

const StarRating = (props) => {
  const [ stars, setStars ] = useState([]);
  function renderStars(stars) {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      (i < stars) ?
      starArray.push(<YellowStar key={i}/>) :
      starArray.push(<EmptyStar key={i}/>)
    }
    setStars(starArray)
  }

  useEffect(() => {
    renderStars(props.rating)
    return () => (setStars([]))
  }, [props.rating])

  return (
    stars?
      <SA> {stars} </SA> :
      <a> ... </a>
  );
}



export default StarRating;