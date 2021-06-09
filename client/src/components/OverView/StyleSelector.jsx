import React from 'react';
// import Price from './Price.jsx';
import StyleList from './StyleList.jsx';

const StyleSelector = ({styles, selectStyle}) => (
  <div>
    <StyleList styles={styles} selectStyle={selectStyle}/>
  </div>
);

export default StyleSelector;