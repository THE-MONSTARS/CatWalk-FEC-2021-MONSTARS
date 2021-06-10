import React from 'react';


export default function Card (props) {

  //Will need url and pricing from styles another get request
  //All Get functions will prob be on a component level higher...


  return (
    <div>
      <p>Some overlay action Component</p>
      <img></img>
      <h4>{props.category}</h4>
      <h2>{props.name}</h2>
      <h3>{props.salePrice ? props.salePrice : props.orginalPrice}</h3>
      <p>Star Component</p>
    </div>
  )


}