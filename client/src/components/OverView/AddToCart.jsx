import React, { useState, useEffect } from 'react';





const AddToCart = ({currentStyle}) => {
  const [ sizeId, setSizeId ] = useState('')
  const [ itemStock, setItemStock ] = useState(10)
  const [ quantity, setQuantity ] = useState(0)

  // API data gives an object of objects. Converting to Array of objects
  const sizes = Object.entries(currentStyle.skus).map(entry => {
    return { id: entry[0], quantity: entry[1].quantity, size: entry[1].size }
  })

  const getStock = () => {
    for (const size of sizes) {
      if (size.id === sizeId) { return size.quantity }
    }
  }

  const createSelectItems = () => {
    const items = [];
    for (let i = 1; i <= (itemStock > 15 ? 15 : itemStock); i++) {
      items.push(i)
    }
    return items
  }

  useEffect(() => {
    let stock = getStock();
    setItemStock(stock)
  }, [sizeId])

  const quantityDropDown = createSelectItems();

  return (
    <div className="add-to-cart">
      <select className="select-size" onChange={e => setSizeId(e.target.selectedOptions[0].attributes['data-id'].value)}>
        <option value={null}>-</option>
        {sizes.map(size => (
          <option key={size.id} data-id={size.id} value={size.size}>{size.size}</option>
        ))}
      </select>

      <select className="select-itemStock" onChange={e => setQuantity(e.target.value)}>
        {quantityDropDown.map(itemStock => (
          <option key={itemStock} value={itemStock}>{itemStock}</option>
        ))}
      </select>

      <button className="add-to-bag" type="button">ADD TO BAG</button>
      <button className="favorite" type="button">Star Symbol</button>
    </div>
  )
}


export default AddToCart;