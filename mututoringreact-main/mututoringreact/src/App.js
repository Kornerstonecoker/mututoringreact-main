import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { StudentView } from "./pages/StudentView";
import { Login } from "./pages/Login";
import { TutorView } from "./pages/TutorView";
import { ErrorPage } from "./pages/ErrorPage";
import {TutorSignup} from "./pages/TutorSignup"
import { Home } from "./pages/Home";
import { StudentSignup } from "./pages/StudentSignup";
import Footer from "./components/Footer";
import { SearchPage } from "./pages/SearchPage";
import { MeetingPage } from "./pages/MeetingPage";
import { ReschedulePage } from "./pages/ReschedulePage";
import { Verify } from "./pages/Verify";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/verify/:hash" element={<Verify />} />
        <Route exact path="/login/:userType" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/students/signup" element={<StudentSignup/>} />
        <Route exact path="/tutors/signup" element={<TutorSignup/>} />
        <Route exact path="/tutors/:id/:code" element={<TutorView />} />
        <Route exact path="/tutors/:id/" element={<TutorView />} />
        <Route exact path="/students/:id" element={<StudentView />} />
        <Route exact path="/error/:code" element={<ErrorPage />} />
        <Route exact path="/new/:id/:code" element={<MeetingPage />} />
        <Route exact path="/reschedule/:id" element={<ReschedulePage />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={
          <SearchPage/>
        }
        />
        <Route path="*" element={<ErrorPage c={404} />} />
      </Routes>
      <Footer/>
    </Router>
  );
}
export default App;


// <Router>
//         <Routes>
//           <Route
//             path="/"
//             exact
//             element={
//               <div className="loginContainer">
//                 <Link className="login" to="/students/login">
//                   StudentLogin
//                 </Link>
//                 <Link className="login" to="/tutors/login">
//                   TutorLogin
//                 </Link>
//                 {/* <Link className='login' to="/students/37">StudentView</Link> */}
//                 <Link className="login" to="/tutors/signup">
//                   TutorSignup
//                 </Link>
//                 <Link className="login" to="/students/signup">
//                   StudentSignup
//                 </Link>
//                 {/* <Link className='login' to="/tutors/1">TutorView</Link> */}
//               </div>
//             }
//           />
//           
//         </Routes>
//       </Router>

