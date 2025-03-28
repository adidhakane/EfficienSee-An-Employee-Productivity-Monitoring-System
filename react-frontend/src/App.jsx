import './App.css'
import LoginSignup from './Components/LoginSignup/LoginSignup.jsx'
import LandingPage from './pages/LandingPage.jsx'
import EmployeePage from './pages/EmployeePage.jsx';
import ManagersPage from './pages/ManagersPage.jsx'; // Update import
// import Employee from "./pages/Employee.js"; // Update path if needed
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // ✅ Import Router



export default function App(){
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginSignup/>}/>
          <Route path="/manager" element={<ManagersPage />} /> 
          <Route path='/employee' element={<EmployeePage/>}/>
      </Routes>
    </Router>
  )
}//working frontend with updated manager's dashboard

// import './App.css'
// import LoginSignup from './Components/LoginSignup/LoginSignup.jsx'
// import LandingPage from './pages/LandingPage.jsx'
// import EmployeePage from './pages/EmployeePage.jsx';
// import ManagersPage from './pages/ManagersPage.jsx';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// export default function App() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <Router>
//       <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<LoginSignup />} />
//           <Route path="/manager" element={user?.role === "manager" ? <ManagersPage /> : <Navigate to="/" />} />
//           <Route path="/employee" element={user?.role === "employee" ? <EmployeePage /> : <Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }
