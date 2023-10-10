// Creating resuable components


export const homeObjOne = {
    id: 'student',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Become A Student',
    headline: 'Get Tutoured By The Best In Your Field Of Study',
    description: 'Sign Up here for free. Join A 1000+ students who have graduated with 4.0 GPA that have been tutored by past honours students!',
    buttonLabel: 'Sign Up',
    imgStart: false,
    img: require('../../assets/svg-3.svg').default,
    alt: 'Image',
    dark: true,
    primary: true,
    darkText: false,
    onClick: () => window.location.href = "/students/signup"
  };
  
  export const homeObjTwo = {
    id: 'tutor',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Become A Tutor',
    headline: 'Proficient At A Module or Course? Looking for a side Hustle?',
    description: 'Why dont you become a Tutor? We have over 500 Tutors teaching 30+ Modules to students in Maynooth! Join us and help students that need that extra help and make money while doing so!',
    buttonLabel: 'Get Started',
    imgStart: true,
    img: require('../../assets/svg-5.svg').default, //Fixed image bug with .default
    alt: 'Image',
    dark: false,
    primary: false,
    darkText: true,
    onClick: () => window.location.href = "/tutors/signup"
  };
  
  export const homeObjThree = {
    id: 'signup',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Become A Tutor',
    headline: 'Creating an account is extremely easy',
    description: 'Get access to our exclusive app that allows you to send unlimited transactions without getting charged any fees.',
    buttonLabel: 'Start Now',
    imgStart: false,
    img: require('../../assets/svg-1.svg').default,
    alt: 'Image',
    dark: false,
    primary: false,
    darkText: true
  };
  