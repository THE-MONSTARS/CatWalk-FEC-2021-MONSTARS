import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';


const SizeDropDown = () => {


  return (
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
  )
}



export default SizeDropDown;