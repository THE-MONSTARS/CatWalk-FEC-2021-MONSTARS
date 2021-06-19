import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DefaultWidth, Header, Button, TextLink } from './styles'
import FontAwesome from 'react-fontawesome'

const CenteredList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Dropdown (props) {
  const [ isListOpen, setIsListOpen ] = useState(false);
  const options = ["date", "helpfulness"]

  function toggleList() {
    let newValue = !isListOpen;
    setIsListOpen(newValue);
  }

  return (
    isListOpen ?
    <React.Fragment>
        <Button
          onClick={props.changeSortOrder}
          value={options[0]}
          style={props.sortBy === options[0] ?
            {textDecoration: 'underline'} :
            {fontWeight: 'none'}}
        >
          {options[0]}
        </Button>
        <Button onClick={toggleList}><FontAwesome name="angle-up" /></Button> <br/>
      <CenteredList>
        <Button
          onClick={props.changeSortOrder}
          value={options[1]}
          style={props.sortBy === options[1] ?
            {textDecoration: 'underline'} :
            {fontWeight: 'none'}}
        >
          {options[1]}
        </Button>
      </CenteredList>
    </React.Fragment> :
    <React.Fragment>
      <Button onClick={toggleList}>
        <TextLink>
          {options[0]}
          <FontAwesome name="angle-down" />
        </TextLink>
      </Button>
    </React.Fragment>
  )
}