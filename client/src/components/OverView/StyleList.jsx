import React from 'react';
import styled from 'styled-components'

const styleSelectContainer = styled.div`
  display: flex;

`



const StyleList = ({styles, selectStyle}) => (
  <div>
    <span>Style > {}</span>

    <ul>
      <li id='83559' onClick={e => selectStyle(e.target.id)} >hardcoded style 1</li>
      <li>hardcoded style 2</li>
      <li>hardcoded style 3</li>
      <li>hardcoded style 4</li>
    </ul>
  </div>
)

export default StyleList;