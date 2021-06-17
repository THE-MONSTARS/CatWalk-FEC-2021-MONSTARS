import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import { DropDownHeader, ListContainer, DropDownItem } from './styles.jsx';
import styled from 'styled-components';

const SizeDropDownContainer = styled.div`
  font-family: 'Roboto';
  width: 140px;
  position: relative;
`

const SizeListContainer = styled(ListContainer)`
  width: 98.5%;
  max-width: 140px;
  z-index: 200;
`

const SizeDropDownHeader = styled(DropDownHeader)`
  font-family: 'Roboto';
  font-size: 12px;
  width: 100%;
  height: 100%;
`

const SizeDropDownItem = styled(DropDownItem)`
  /* width: 100%; */
`

const SizeDropDown = ({size, sizes, isActive, setIsActive, handleSizeClick}) => {


  return (
    <SizeDropDownContainer>
      <SizeDropDownHeader value={null} onClick={() => {setIsActive(prev => !prev)}}>
        {size ? size : 'Select Size'}
      </SizeDropDownHeader>
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