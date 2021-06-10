import React from 'react';
import styled from 'styled-components'

const StyleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const SelectableStyleImg = styled.img`
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const StyleList = ({styles, selectStyle}) => (
  <div>
    <StyleContainer>
      <span>Style > {}</span>
      {styles.map(style => (
        <SelectableStyleImg key={style.style_id} id={style.style_id} src={style.photos[0].thumbnail_url} onClick={e=> selectStyle(e.target.id)}/>
      ))}
    </StyleContainer>
  </div>
)

export default StyleList;