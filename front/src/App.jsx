// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Register from "./components/teacheLoginSignUp/Register";
import Login from "./components/teacheLoginSignUp/Login";
import VerifyOtp from "./components/teacheLoginSignUp/VerifyOtp";
import SetupPassword from "./components/teacheLoginSignUp/SetupPassword";

import HomePage from "./components/homePage/HomePage";

import MainResourcesPage from "./components/dasboardTeacher/mainPageDashboard/MainResourcespage";
import DetailsResources from "./components/dasboardTeacher/materialPage/DetailsResources";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/setup-password" element={<SetupPassword />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/MainResourcesPage" element={<MainResourcesPage />} />
          <Route path="/DetailsResources" element={<DetailsResources />} />

          
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
