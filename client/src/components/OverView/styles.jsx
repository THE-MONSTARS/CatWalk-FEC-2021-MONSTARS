import styled from 'styled-components'

export const DropDownHeader = styled.button`
  background: white;
  padding: 6px 0;
  /* width: 100px; */
  border: 1px solid #343a40;
  color: #343a40;
  align-self: flex-start;
  flex-grow: 0;
  &:focus + ul {
    opacity: 1;
    pointer-events: all;
  }
`

export const ListContainer = styled.div`
  position: absolute;
  display: flex;
  border: 0.5px solid #343a40;
  border-radius: 1px;
  flex-direction: column;
  background: white;
  border-radius: 0.5px;
  /* justify-content: center; */
  align-items: center;
  width: 100px;

  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 0.4s;
  }
  &.fade-enter-done {
    opacity: 1;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: opacity 0.4s;
  }
`

export const DropDownItem = styled.li`
  list-style: none;
  color: #343a40;
  display: flex;
  justify-content: center;
  padding: 4px 0;
  width: 100%;
  height: 100%;
  /* opacity: 0; */
  transition: all 0.2s ease;

  &:hover {
    cursor: default;
    background-color: #C0E8F9
  }
`