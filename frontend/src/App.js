import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import Regiter from "./components/Regiter";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Regiter />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
