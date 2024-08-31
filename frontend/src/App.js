import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import Regiter from "./components/Regiter";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ManagerDashboard from "./components/ManagerDashboard";
import UserDashboard from "./components/UserDashboard";
import NavBar from "./components/NavBar";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "./PrivateRoute";
import { useEffect, useState } from "react";

function App() {
  const [decodedToken, setDecodedToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    } else {
      setDecodedToken(null);
    }
  }, [localStorage.getItem("token"), location]);

  console.log("decodedToken", decodedToken);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Regiter />} />
        <Route
          path="/dashboard"
          element={[
            <PrivateRoute>
              <NavBar />, <DashBoard user={decodedToken?.user} />
            </PrivateRoute>,
          ]}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route
          path="/user-dashboard"
          element={[<NavBar />, <UserDashboard />]}
        />
      </Routes>
    </>
  );
}

export default App;
