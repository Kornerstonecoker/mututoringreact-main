import React, { useState } from "react";
import Video from "../../assets/video.mp4";
import { Button } from "../ButtonElements";

import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroDescription,
  HeroBtnWrapper,
  HeroH1,
  HeroP,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";

const HeroSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };
  return (
    <HeroContainer>
      <HeroBg>
      <VideoBg playsInline autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBg>
      <HeroDescription>
        <HeroH1>Tutoring Made Easy</HeroH1>
        <HeroP>Find a tutor today!</HeroP>
        <HeroBtnWrapper>
          <Button
            to="student"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            duration={500}
            smooth={true}
            primary="true"
            dark="true"
          >
            Get Started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroDescription>
    </HeroContainer>
  );
};

export default HeroSection;