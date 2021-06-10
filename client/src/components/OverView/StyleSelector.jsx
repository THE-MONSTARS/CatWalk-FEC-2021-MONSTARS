import React from 'react';
// import Price from './Price.jsx';
import StyleList from './StyleList.jsx';

const StyleSelector = ({styles, currentStyle, selectStyle}) => (
  <div>
    <StyleList styles={styles} currentStyle={currentStyle} selectStyle={selectStyle}/>
  </div>
);

export default StyleSelector;