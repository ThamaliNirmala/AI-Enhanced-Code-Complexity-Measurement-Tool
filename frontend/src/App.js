import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import Regiter from './components/Regiter';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/Register' element={<Regiter />} />
        <Route path='/' element={<DashBoard />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
