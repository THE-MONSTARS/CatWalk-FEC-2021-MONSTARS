import React,{ useState } from 'react';
import styled from 'styled-components';


const EmptyStar = '../assets/icons8-star-24-empty.png'

const CrossCircle = '../assets/outline_highlight_off_black_24dp.png'

const StyleImg = styled.img`
width: 50px;
height: 50px;
`


export default function RelatedAction () {
  const [isRelated, setIsRelated] = useState(true)

  // const function showCompare() {

  // }

  return (
    <StyleImg src={isRelated? EmptyStar : CrossCircle}/>
  )
}