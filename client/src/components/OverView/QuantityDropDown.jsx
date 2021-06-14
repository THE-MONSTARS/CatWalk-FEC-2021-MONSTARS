import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import { DropDownHeader, ListContainer, DropDownItem } from './styles.jsx';
import styled from 'styled-components';

const QuantityDropDownContainer = styled.div`
  flex-basis: 30%;
`

const QuantityListContainer = styled(ListContainer)`

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
    <QuantityDropDownContainer >
      <DropDownHeader value={null} onClick={() => {setHasStock(prev => !prev)}}>{quantity}</DropDownHeader>

        <CSSTransition key={itemStock} in={hasStock} unmountOnExit timeout={400} classNames='fade'>
          <QuantityListContainer>
            {quantityDropDownComponents.map(itemStock => (
              <DropDownItem key={itemStock} value={itemStock} onClick={e => setQuantity(e.target.value)}>{itemStock}</DropDownItem>
            ))}
          </QuantityListContainer>
        </CSSTransition>

    </QuantityDropDownContainer>
  )
}

export default QuantityDropDown;