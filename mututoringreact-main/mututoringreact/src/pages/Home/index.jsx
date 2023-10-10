import React, {useState} from 'react'
import NavBar from '../../components/Navbar'
import HeroSection from '../../components/HeroSection'
import InfoSection from '../../components/InfoSection'
import { homeObjOne, homeObjTwo, homeObjThree } from '../../components/InfoSection/Data'
import Sercices from '../../components/Services'
export const Home = () => {
  if(localStorage.getItem("token"))
    window.location.href = (localStorage.getItem('userType') == 'T' ? '/tutors' : '/students') + "/" + localStorage.getItem('userId');
  return (
    <>
      <NavBar/>
      <HeroSection />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <Sercices/>
      {/* <InfoSection {...homeObjThree} /> */}
    </>
  )
}
