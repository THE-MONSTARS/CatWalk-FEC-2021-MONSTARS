import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const HeaderContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Roboto-Bold';
  color: #ffffff;
  padding-left: 30px;
  padding-right: 70px;
  margin-bottom: 25px;
  height: 60px;
  width: 100%;
  background: #222831;
`

const UselessSearchBar = styled.input`
  border-radius: 5px;
`

const DevButton = styled.button`
  opacity: 0;
  &:hover {
    opacity: 1;
    transition: all 1s ease;
  }
`

const Header = ({setShowClickTracking}) => {
  return (
    <HeaderContainer>
      <div>
        Monstars Inc.
      </div>
      <DevButton onClick={() => setShowClickTracking(prev => !prev)} >
        Secret Dev Button
      </DevButton>
      <div>
        <label htmlFor="search"> Search: </label>
        <UselessSearchBar type="search" id="search"></UselessSearchBar>
      </div>
    </HeaderContainer>
  )
}

Header.propTypes = {

}

export default Header;
