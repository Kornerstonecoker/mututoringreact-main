import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'
import { Link as LinkS } from 'react-scroll'
// import Image from "../../assets/logo.png";


export const Nav = styled.nav`
  background: ${({scrollNav}) => (scrollNav ? '#000' : 'transparent')};
  height:80px;
  /* width: 100%; */
  margin-top: -80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index:10;
  @media screen and (max-width: 960px){
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  /* display: flex;
  flex-direction: row;
  margin-left: auto;
  height: 80px;
  z-index: 999;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px; */
  display: flex;
  height: 80px;
  z-index: 1;
  justify-content: space-between;
  width: 100%;
  padding: 0 24px;
`;

export const NavLogo = styled(LinkR)`
  color: #fff;
  justify-self:flex-start;
  width: 200px;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight:bold;
  text-decoration: none;
`;


// Making the website responsive to mobile
export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px){
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const NavMenu = styled.ul`
  /* display: flex;
  flex-grow: 1;
  align-items: right;
  list-style: none;
  text-align: center;
  margin-right: 50px;
  // justify-content: space-between;
  @media screen and (max-width: 500px){
    display: none;
  } */

  display: flex;
  // align-items: center;
  list-style: none;
  text-align: center;

`;

export const NavItem = styled.li`
height: 80px;
`

export const NavLinks = styled(LinkS)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active{
    border-bottom: 3px solid #01bf71;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px){
    display: none;
  }
`

export const NavBtnLink = styled(LinkR)`
  border-radius: 10px;
  background: #01bf71;
  white-space: nowrap;
  padding: 10px 22px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover{
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`
// Research styled components to make my code more readable
