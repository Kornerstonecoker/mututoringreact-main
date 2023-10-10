import React from "react";
import Icon1 from '../../assets/svg-2.svg'
import Icon2 from '../../assets/svg-4.svg'
import Icon3 from '../../assets/svg-6.svg'
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,

  ServicesH2,
  ServicesP


} from "./ServicesElements";

const Sercices = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Discounts</ServicesH2>
          <ServicesP>
            We offer monthly discounts to our students that are subscribed to our newsletters.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Virtual Learning</ServicesH2>
          <ServicesP>
            You can access our platform any where in the world. The option to be tutored online is also an option! 
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Premium Benefits</ServicesH2>
          <ServicesP>
            Students subscribed to our newsletter will  be entered into monthly competitions!
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Sercices;
