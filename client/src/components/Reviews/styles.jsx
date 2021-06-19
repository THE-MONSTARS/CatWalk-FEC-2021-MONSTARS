import styled from 'styled-components';

const DefaultWidth = styled.div`
  min-width: 600px;
  position: left;
`;

const Header = styled.h1`
  font-family: Helvetica, sans-serif;
  font-size: 150%;
  font-weight: bold;
  margin-bottom: 10px;
`;

const TextLink = styled.a`
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
font-size: inherit;
  font-weight: bold;
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export {
  Header,
  DefaultWidth,
  TextLink,
  Button
}