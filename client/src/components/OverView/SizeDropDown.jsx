import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import { DropDownHeader, ListContainer, DropDownItem } from './styles.jsx';
import styled from 'styled-components';

const SizeDropDownContainer = styled.div`
  flex-basis: 50%;
`


const SizeListContainer = styled(ListContainer)`

`

const SizeDropDown = ({size, sizes, isActive, setIsActive, handleSizeClick}) => {


  return (
    <SizeDropDownContainer>
      <DropDownHeader value={null} onClick={() => {setIsActive(prev => !prev)}}>
        {size ? size : 'Select Size'}
      </DropDownHeader>
        <CSSTransition in={isActive} unmountOnExit timeout={700} classNames='fade'>

          <SizeListContainer>
          {sizes.map(size => (
              <DropDownItem key={size.id} value={size.size} data-id={size.id}  onClick={e => handleSizeClick(e)}>{size.size} </DropDownItem>
              ))}
          </SizeListContainer>

        </CSSTransition>
    </SizeDropDownContainer>
  )
}



export default SizeDropDown;