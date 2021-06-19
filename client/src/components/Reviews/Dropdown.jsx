import React from 'react'
import styled from 'styled-components';
import { DefaultWidth, Header, Button } from './styles'

export default function Dropdown (props) {
  const [ isOpen, setIsOpen ] = false;

  function toggleList() {
    setIsOpen( true && false || false && true)
  }

  return (
    <Button onClick={toggleList}>
      <TextLink>
        Date
      </TextLink>
    </Button>
  )
}