import React from 'react';
import styled from 'styled-components'

const StyleListContainer = styled.div`
  width: 100%;
`

const StyleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  width: 200px;
`

const SelectedStyle = styled.span`
  width: 100%;
`

const SelectableStyleImg = styled.img`
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`


const StyleList = ({styles, currentStyle, selectStyle}) => (
  <StyleListContainer>
    <SelectedStyle>Style > {currentStyle.name}</SelectedStyle>
    <StyleContainer>
      {styles.map(style => (
        <SelectableStyleImg key={style.style_id} id={style.style_id} src={style.photos[0].thumbnail_url} onClick={e=> selectStyle(e.target.id)}/>
      ))}
    </StyleContainer>
  </StyleListContainer>
)

export default StyleList;