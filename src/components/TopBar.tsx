import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Colors, Shadows, Sizes, Transitions } from '../global/styles'
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { AccountButton } from './account/AccountButton'


export function TopBar() {
  return (
 <Header>
   <HeaderNav>
   🤝  SideQuest
   </HeaderNav>
   <HeaderItems>
   <AccountButton />

   </HeaderItems>
 </Header>
  )
}

const Header = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  align-items: center;
  width: 100%;
  height: ${Sizes.headerHeight};
  background-color: ${Colors.White};
  box-shadow: ${Shadows.main};
  z-index: 100;
`

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
  position: absolute;
  left: 5em;
`
const HeaderItems = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  position: absolute;
  right: 5em;
`