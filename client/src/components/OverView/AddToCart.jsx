import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';


const AddToCartContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 260px;
`

const SmoothedDropdown = styled.div`
  min-width: 80px;
  margin: 5px 0;
  /* border: 1px solid black; */
  outline: none;
`

const FadeP = styled.section`
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 0.7s;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity: 0.7s;
  }
`

const SizeListContainer = styled.div`
  position: absolute;
  display: flex;
  border: 0.5px solid #090302;
  flex-direction: column;
  background: white;
  border-radius: 0.5px;
  justify-content: center;
  align-items: center;
  width: 100px;

  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 0.4s;
  }
  &.fade-enter-done {
    opacity: 1;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: opacity 0.4s;
  }
`

const QuantityListContainer = styled.div`
  position: absolute;
  display: flex;
  border: 0.5px solid #090302;
  flex-direction: column;
  background: white;
  border-radius: 0.5px;
  justify-content: center;
  align-items: center;
  width: 100px;

  &.fadestock-enter {
    opacity: 0;
  }
  &.fadestock-enter-active {
    opacity: 1;
    transition: opacity 0.4s;
  }
  &.fadestock-enter-done {
    opacity: 1;
  }

  &.fadestock-exit {
    opacity: 1;
  }

  &.fadestock-exit-active {
    opacity: 0;
    transition: opacity 0.4s;
  }
`

const DropdownHeader = styled.button`
  background: none;
  padding: 6px 0;
  width: 102px;
  border: 1px solid #090302;
  color: black;
  align-self: flex-start;
  &:focus + ul {
    opacity: 1;
    pointer-events: all;
  }

`
const DropdownItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 4px 0;
  width: 100%;
  height: 100%;
  /* opacity: 0; */
  transition: all 0.2s ease;

  &:hover {
    cursor: default;
    background-color: #C0E8F9
  }
`

const SizeDropDown = styled(SmoothedDropdown)`
  flex-basis: 50%;
  /* transition: all 0.4s ease; */
`
const QuantityDropDown = styled(SmoothedDropdown)`
  flex-basis: 30%;
`

const AddToBagButton = styled.button`
  align-self: flex-end;
`



const AddToCart = ({currentStyle}) => {
  const [ sizeId, setSizeId ] = useState('')
  const [ itemStock, setItemStock ] = useState(10)
  const [ quantity, setQuantity ] = useState(1)
  const [ isActive, setIsActive ] = useState(false)
  const [ hasStock, setHasStock ] = useState(false)
  const sizeRef = useRef(null)

  // API data gives an object of objects. Converting to Array of objects
  const sizes = Object.entries(currentStyle.skus).map(entry => {
    return { id: entry[0], quantity: entry[1].quantity, size: entry[1].size }
  })

  const getStock = () => {
    for (const size of sizes) {
      if (size.id === sizeId) { return size.quantity }
    }
  }

  const createQuantityDropDown = () => {
    const items = [];
    for (let i = 1; i <= (itemStock > 15 ? 15 : itemStock); i++) {
      items.push(i)
    }
    return items
  }

  const handleClickOutside = (e) => {
    if (sizeRef.current && !sizeRef.current.contains(e.target)) {
      setIsActive(false);
      setHasStock(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
  })

  useEffect(() => {
    let stock = getStock();
    setItemStock(stock)
  }, [sizeId])

  const quantityDropDownComponents = createQuantityDropDown();

  return (
    <AddToCartContainer>
      {/* For Select Size Dropdown */}
      <SizeDropDown ref={sizeRef} className="select-size" >
        <DropdownHeader value={null} onClick={() => {setIsActive(prev => !prev)}}>
          Select Size
        </DropdownHeader>
            <CSSTransition in={isActive} unmountOnExit timeout={700} classNames='fade'>

              <SizeListContainer>
              {sizes.map(size => (
                  <DropdownItem key={size.id} data-id={size.id} value={size.size} onClick={e => setSizeId(e.target.attributes['data-id'].value)}>{size.size} </DropdownItem>
                  ))}
              </SizeListContainer>

            </CSSTransition>
      </SizeDropDown>





       {/* For Select Quantity Dropdown */ }

        { sizeId
        ?
        <QuantityDropDown >
          <DropdownHeader value={null} onClick={() => {setHasStock(prev => !prev)}}>{quantity}</DropdownHeader>

            <CSSTransition key={itemStock} in={hasStock} unmountOnExit timeout={400} classNames='fadestock'>
              <QuantityListContainer>
                {quantityDropDownComponents.map(itemStock => (
                  <DropdownItem key={itemStock} value={itemStock} onClick={e => setQuantity(e.target.value)}>{itemStock}</DropdownItem>
                ))}
              </QuantityListContainer>
            </CSSTransition>

        </QuantityDropDown>
        :
        <QuantityDropDown>
          <DropdownHeader value={null}>-</DropdownHeader>
        </QuantityDropDown>
        }


      {itemStock && <AddToBagButton className="add-to-bag" type="button">ADD TO BAG</AddToBagButton>}
      <AddToBagButton className="favorite" type="button">Star Symbol</AddToBagButton>

    </AddToCartContainer>
  )
}


export default AddToCart;