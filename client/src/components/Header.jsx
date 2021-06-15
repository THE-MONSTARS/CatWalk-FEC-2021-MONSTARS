import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Roboto-Bold';
  color: #ffffff;
  padding-left: 30px;
  margin-bottom: 25px;
  height: 60px;
  width: 100%;
  background: #222831;
`

const Header = () => {
  return (
    <HeaderContainer>
      Monstars Inc.
    </HeaderContainer>
  )
}

Header.propTypes = {

}

export default Header;
