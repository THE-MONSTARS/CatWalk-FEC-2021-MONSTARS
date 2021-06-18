import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import { DropDownHeader } from './styles.jsx';
import styled from 'styled-components';
import SizeDropDown from './SizeDropDown.jsx';
import QuantityDropDown from './QuantityDropDown.jsx';


const AddToCartContainer = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  flex-grow: 0;
  min-height: 260px;
`

const DropDownsContainer = styled.div`
/* border: 1px solid orange; */
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-grow: 0;
`

const DisabledDropDownHeader = styled(DropDownHeader)`
  width: 50px;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
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
const CTAButton = styled.button`
   border-radius: 1px;
   background: white;
   border: 1px solid #343a40;
   color: #343a40;
   text-align: center;
   text-transform: uppercase;
   font-size: 22px;
   padding: 10px;
   transition: all 0.4s;
   cursor: pointer;
   margin: 5px 0;
   width: 200px;
`

const AddToBagButton = styled(CTAButton)`
  width: 120px;
  font-size: 10px;
  box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);

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
  box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);

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

  useEffect(() => {
    setSize(['', ''])
  }, [currentStyle])

  return (
    <AddToCartContainer>
      <DropDownsContainer>

        <SizeDropDown
          size={size}
          sizes={sizes}
          isActive={isActive}
          setIsActive={setIsActive}
          handleSizeClick={handleSizeClick}
        />

        {sizeId
        ? <QuantityDropDown
          setHasStock={setHasStock}
          quantity={quantity}
          setQuantity={setQuantity}
          itemStock={itemStock}
          hasStock={hasStock}
        />
        : <DisabledDropDownHeader value={null}>-</DisabledDropDownHeader>}

      </DropDownsContainer>

        <CSSTransition in={size.length > 0} unmountOnExit timeout={400} classNames='fadebtn'>
          <ButtonContainer>

            <AddToBagButton>
              <AddToBagCTA>
                ADD TO BAG
              </AddToBagCTA>
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