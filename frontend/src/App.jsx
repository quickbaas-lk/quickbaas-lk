
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import HomeownerDashboard from './pages/HomeownerDashboard';
import TechnicianRegister from './pages/TechnicianRegister';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Homeowner Dashboard */}
          <Route path="/dashboard" element={<HomeownerDashboard />} />

          {/* Technician Registration */}
          <Route
            path="/technician-register"
            element={<TechnicianRegister />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
