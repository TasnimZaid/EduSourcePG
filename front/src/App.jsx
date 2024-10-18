// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Register from "./components/teacheLoginSignUp/Register";
import Login from "./components/teacheLoginSignUp/Login";
import VerifyOtp from "./components/teacheLoginSignUp/VerifyOtp";
import SetupPassword from "./components/teacheLoginSignUp/SetupPassword";


import RegisterS from "./components/studentLogSign/RegisterS";
import LoginS from "./components/studentLogSign/LoginS";
import VerifyOtpS from "./components/studentLogSign/VerifyOtpS";
import SetupPasswordS from "./components/studentLogSign/SetupPasswordS";

import HomePage from "./components/homePage/HomePage";

import MainResourcesPage from "./components/dasboardTeacher/mainPageDashboard/MainResourcespage";
import DetailsResources from "./components/dasboardTeacher/materialPage/DetailsResources";
import ProfileTeacher from "./components/dasboardTeacher/profileTeacher/ProfileTeacher";
import TeacherProfile from "./components/dasboardTeacher/profileTeacher/TeacherProfile";
import ProfileExplorer from "./components/dasboardTeacher/profileTeacher/ProfileExplorer";
import TeacherProfileInfo from "./components/dasboardTeacher/profileTeacher/TeacherProfileInfo";
import ConsultantRequests from "./components/dasboardTeacher/profileTeacher/ConsultantProfile";
import AppointmentForConsultant from "./components/dasboardTeacher/Consultant/ConsultantAppointment";


import StudentDashboard from "./components/studentDashboard/StudentProfile";
import StudentProfile from "./components/studentDashboard/StudentDashboard";


import QuizPlatform from "./components/quizePage/QuizePAge";



import Consultants from "./components/consultant.jsx/Consultants";
import TeacherDetailPage from "./components/consultant.jsx/ConsultantDetails";
import AppointmentforTeacher from "./components/consultant.jsx/AppointmentforTeacher";



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/setup-password" element={<SetupPassword />} />

          <Route path="/RegisterS" element={<RegisterS />} />
          <Route path="/LoginS" element={<LoginS />} />
          <Route path="/VerifyOtpS" element={<VerifyOtpS />} />
          <Route path="/SetupPasswordS" element={<SetupPasswordS />} />



          <Route path="/" element={<HomePage />} />
          <Route path="/MainResourcesPage" element={<MainResourcesPage />} />
          <Route path="/DetailsResources" element={<DetailsResources />} />
          {/* <Route path="/ProfileTeacher" element={<ProfileTeacher />} /> */}
          <Route path="/ProfileExplorer" element={<ProfileExplorer />} />
          <Route path="/ConsultantRequests" element={<ConsultantRequests />} />

          


          <Route path="/StudentDashboard" element={<StudentDashboard />} />

          
          <Route path="/TeacherProfileInfo" element={<TeacherProfileInfo />} />
          <Route path="/TeacherProfile" element={<TeacherProfile />} />
          <Route path="/AppointmentForConsultant" element={<AppointmentForConsultant />} />

          


          <Route path="/StudentProfile" element={<StudentProfile />} />

          
          <Route path="/QuizPlatform" element={<QuizPlatform />} />

          <Route path="/Consultants" element={<Consultants />} />
          <Route path="/TeacherDetailPage/:id" element={<TeacherDetailPage />} />
          
          <Route path="/AppointmentforTeacher" element={<AppointmentforTeacher />} />

          
          
          

          
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
