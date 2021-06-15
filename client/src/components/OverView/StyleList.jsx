import React, { useState } from 'react';
import styled from 'styled-components'

const StyleListContainer = styled.div`
  margin-top: 15px;
  width: 100%;
`

const StyleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  width: 260px;
`

const SelectedStyle = styled.span`
  font-family: 'Roboto';
  width: 100%;
`

const SelectableStyleImg = styled.img`
  border: 0.5px solid #949799;
  object-fit: cover;
  margin-right: 8px;
  margin-bottom: 8px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: ${props => props.current ? '1px 1px 4px 2px #7fa7c0' : null};
  &:hover {
    cursor: pointer;
    box-shadow: ${props => props.current ? '1px 1px 4px 2px #7fa7c0' : '1px 1px 2px 0.3px #7fa7c0'}
  }
`


const StyleList = ({styles, currentStyle, selectStyle}) => {

  return (
  <StyleListContainer>
    <SelectedStyle>Style > {currentStyle.name}</SelectedStyle>
    <StyleContainer>
      {styles.map(style => (
        <SelectableStyleImg current={currentStyle.style_id === style.style_id} key={style.style_id} id={style.style_id} src={style.photos[0].thumbnail_url} onClick={e=> selectStyle(e.target.id)}/>
      ))}
    </StyleContainer>
  </StyleListContainer>
  )
}

export default StyleList;