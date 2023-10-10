import React from "react";
import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavItem,
  NavLinks,
  NavMenu,
  MobileIcon,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import { animateScroll as scroll } from "react-scroll";

import Sidebar from "../Sidebar";

import { useState, useEffect } from "react";

const NavBar = () => {
  const [scrollNav, setScrollNav] = useState(false);
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const whenLoggedIn = () => {
    let isTutor = localStorage.getItem("userType") == "T";
    let id = localStorage.getItem("userId");
    let endpoint = isTutor ? "/tutors/" + id : "/students/" + id;
    return <>
      <NavMenu>
        {!isTutor &&
          <NavBtn>
            <NavBtnLink onClick={() => window.location.href = "/search"}>
            Find a Tutor</NavBtnLink>
          </NavBtn>
        }
        
      </NavMenu>
      <NavBtn>
        <NavMenu>
        <NavItem>
            <NavLinks  onClick={ () =>
              window.location.href = endpoint
            }>Profile</NavLinks>
          </NavItem>
        </NavMenu>
        <NavBtnLink to="/" onClick={() => {
          localStorage.removeItem("userId");
          localStorage.removeItem("userType");
          localStorage.removeItem("token");
        }}>Log out</NavBtnLink>
      </NavBtn>
    </>
  }

  const whenGuest = () => {
    return (
      <>
            <NavMenu>
              <NavItem>
                <NavLinks
                  to="student"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Become a Student
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="tutor"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Become a Tutor
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="services"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Services
                </NavLinks>
              </NavItem>
              <NavBtn>
                <NavBtnLink to="/login">Sign In</NavBtnLink>
              </NavBtn>
            </NavMenu>
      </>
    );
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo to="/" onClick={toggleHome}>
            MU Tutors
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          {localStorage.getItem("token") ? whenLoggedIn() : whenGuest()}
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default NavBar;

// Research stock components to make my code more readable
