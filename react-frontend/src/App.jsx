import './App.css'
import LoginSignup from './Components/LoginSignup/LoginSignup.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ManagerPage from './pages/ManagerPage.jsx';
import EmployeePage from './pages/EmployeePage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // ✅ Import Router



export default function App(){
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginSignup/>}/>
          <Route path="/manager" element={<ManagerPage/>}/>
          <Route path='/employee' element={<EmployeePage/>}/>
      </Routes>
    </Router>
  )
}