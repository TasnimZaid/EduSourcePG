// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/";
import Login from "./components/Login";
import VerifyOtp from "./components/VerifyOtp";
import SetupPassword from "./components/SetupPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/setup-password" element={<SetupPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
