import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DefaultWidth, Header, Button, TextLink } from './styles'
import FontAwesome from 'react-fontawesome'

// export default class Dropdown extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       isListOpen: false,
//       sortBy: this.props.sortBy,
//       options: [
//         "date",
//         "Helpfulness"
//       ]
//     }
//   }
// }

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

  // render() {
  return (
    isListOpen ?
    <React.Fragment>
        <Button onClick={props.changeSortOrder} value={options[0]}> {options[0]} </Button>
        <Button onClick={toggleList}><FontAwesome name="angle-up" /></Button> <br/>
      <CenteredList>
        <Button onClick={props.changeSortOrder}value={options[1]}> {options[1]} </Button>
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
  // }
}