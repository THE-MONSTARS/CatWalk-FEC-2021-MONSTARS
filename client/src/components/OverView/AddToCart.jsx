import React from 'react';

const AddToCart = () = > (
  <div className="add-to-cart">
    <select className="select-size">
      <option value="small">small</option>
      <option value="medium">medium</option>
      <option value="large">large</option>
    </select>

    <select className="select-quantity">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>

    <button className="add-to-bag" type="button">ADD TO BAG</button>
    <button className="favorite" type="button">Star Symbol</button>
  </div>
)

export default AddToCart;