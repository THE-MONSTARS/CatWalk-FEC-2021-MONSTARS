import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';


const AddToCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 0;
  min-height: 260px;
`

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 100%;
  justify-content: space-between;
`

const ButtonContainer = styled.div`

  display: flex;
  flex-direction: row;
  flex-basis: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 5px 8px;
  &.fadebtn-enter {
    opacity: 0;
  }
  &.fadebtn-enter-active {
    opacity: 1;
    transition: opacity 0.4s;
  }
  &.fadebtn-enter-done {
    opacity: 1;
  }

  &.fadebtn-exit {
    opacity: 1;
  }

  &.fadebtn-exit-active {
    opacity: 0;
    transition: opacity 0.4s;
  }
`

const SmoothedDropdown = styled.div`
  min-width: 80px;
  margin: 5px 0;
  /* border: 1px solid black; */
  outline: none;
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

const CTAButton = styled.button`
   border-radius: 4px;
   background: linear-gradient(to right, #67b26b, #4ca2cb);
   border: none;
   color: #FFFFFF;
   text-align: center;
   text-transform: uppercase;
   font-size: 22px;
   padding: 10px;
   transition: all 0.4s;
   cursor: pointer;
   margin: 5px;
   width: 200px;
`

const AddToBagButton = styled(CTAButton)`
  width: 80px;
  font-size: 10px;
  flex-basis: 60%;
  &:hover ${AddToBagCTA} {
    padding-right: 25px;
  }
  &:hover ${AddToBagCTA}:after {
    opacity: 1;
    right: -19px;
  }

`

const FavoriteButton = styled(CTAButton)`
  width: 80px;
  font-size: 10px;
  flex-basis: 40%;
  &:hover {
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;
  }
`

const AddToBagCTA = styled.span`
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.4s;

  &:after {
    content: '>';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
  }

`


const AddToCart = ({currentStyle}) => {
  const [ [sizeId, size], setSize ] = useState(['', ''])
  const [ itemStock, setItemStock ] = useState('')
  const [ quantity, setQuantity ] = useState(0)
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
    // if (sizeRef.current && !sizeRef.current.contains(e.target)) {
    // }
    // can keep the above logic if we want the event the not fire for focused element
      setIsActive(false);
      setHasStock(false);
  }

  const handleSizeClick = (e) => {
    let sizeValue = e.target.attributes['value'].value;
    let sizeIdValue = e.target.attributes['data-id'].value;
    setSize([sizeIdValue, sizeValue])
    setQuantity(1)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }
  })

  useEffect(() => {
    let stock = getStock();
    setItemStock(stock)
  }, [sizeId])

  const quantityDropDownComponents = createQuantityDropDown();

  return (
    <AddToCartContainer>

      <DropDownContainer>
        {/* For Select Size Dropdown */}
        <SizeDropDown ref={sizeRef} className="select-size" >
          <DropdownHeader value={null} onClick={() => {setIsActive(prev => !prev)}}>
            {size ? size : 'Select Size'}
          </DropdownHeader>
              <CSSTransition in={isActive} unmountOnExit timeout={700} classNames='fade'>

                <SizeListContainer>
                {sizes.map(size => (
                    <DropdownItem key={size.id} value={size.size} data-id={size.id}  onClick={e => handleSizeClick(e)}>{size.size} </DropdownItem>
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

      </DropDownContainer>

      {/* DropDowns end here */}


        <CSSTransition in={size} unmountOnExit timeout={400} classNames='fadebtn'>
          <ButtonContainer>

            <AddToBagButton>
              <AddToBagCTA>ADD TO BAG</AddToBagCTA>
            </AddToBagButton>

            <FavoriteButton>
              WOOO
            </FavoriteButton>

          </ButtonContainer>
        </CSSTransition>


    </AddToCartContainer>
  )
}


export default AddToCart;