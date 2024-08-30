import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import Regiter from "./components/Regiter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Regiter />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </>
  );
}

export default App;
