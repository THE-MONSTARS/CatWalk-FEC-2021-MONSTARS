import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Thumb = styled.img`
  max-width: 50px;
  max-height: 50px;
  border: solid black 1px;
  margin: 5px;
  box-shadow: 0px 2.5px 10px #1d62bd;
  &:hover {
    cursor: pointer;
  }
`;

const FullImg = styled.img`
  min-width: 100px;
  min-height: 100px;
  border: solid blue 1px;
  margin 5px;
  &:hover {
    cursor: pointer;
  }
`;

export default function ReviewThumbs(props) {

  return (
    props.selectedPhoto ?
    <div>
      {props.photos.map((photo, index) => {
        return photo.id === Number(props.selectedPhoto) ? (<FullImg src={photo.url} key={photo.id} id={photo.id}/>) :
        (<Thumb src={photo.url} key={photo.id} id={photo.id} onClick={props.selectPhoto}/>)
      })}
    </div> :

    <div>
    {props.photos.map((photo, index) => {
      return (<Thumb src={photo.url} key={photo.id} id={photo.id} onClick={props.selectPhoto}/>)
    })}
  </div>
  )
}