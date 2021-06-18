import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import { DropDownHeader, ListContainer, DropDownItem } from './styles.jsx';
import styled from 'styled-components';

const QuantityDropDownContainer = styled.div`
  font-family: 'Roboto';
  position: relative;
  width: 50px;
`

const QuantityListContainer = styled(ListContainer)`
  width: 96.5%;
  z-index: 200;
`

const QuantityDropDownHeader = styled(DropDownHeader)`
  font-family: 'Roboto';
  width: 50px;
`

const QuantityDropDownItem = styled(DropDownItem)`
  width: 100%;
`

const QuantityDropDown = ({setHasStock, quantity, setQuantity, itemStock, hasStock}) => {

  const createQuantityDropDown = () => {
    const items = [];
    for (let i = 1; i <= (itemStock > 15 ? 15 : itemStock); i++) {
      items.push(i)
    }
    return items
  }

  const quantityDropDownComponents = createQuantityDropDown();

  return (
    <QuantityDropDownContainer>
      <QuantityDropDownHeader value={null} onClick={() => {setHasStock(prev => !prev)}}>{quantity}</QuantityDropDownHeader>

        <CSSTransition key={itemStock} in={hasStock} unmountOnExit timeout={400} classNames='fade'>
          <QuantityListContainer>
            {quantityDropDownComponents.map(itemStock => (
              <DropDownItem
                key={itemStock}
                value={itemStock}
                onClick={e => setQuantity(e.target.value)}
              >
                {itemStock}
              </DropDownItem>
            ))}
          </QuantityListContainer>
        </CSSTransition>

    </QuantityDropDownContainer>
  )
}

export default QuantityDropDown;