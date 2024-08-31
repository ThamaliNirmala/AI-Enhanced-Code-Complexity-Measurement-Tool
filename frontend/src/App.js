import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import Regiter from "./components/Regiter";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ManagerDashboard from "./components/ManagerDashboard";
import UserDashboard from "./components/UserDashboard";
import NavBar from "./components/NavBar";
import { jwtDecode } from "jwt-decode";

function App() {
  let decodedToken;
  if (localStorage.getItem("token")) {
    decodedToken = jwtDecode(localStorage.getItem("token"), { header: false });
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Regiter />} />
        <Route
          path="/dashboard"
          element={[<NavBar />, <DashBoard user={decodedToken?.user} />]}
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
