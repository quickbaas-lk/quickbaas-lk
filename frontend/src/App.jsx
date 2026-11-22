import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import HomeownerDashboard from './pages/HomeownerDashboard';
import TechnicianOnboarding from './pages/TechnicianOnboarding';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* URL of Landing Page */}
          <Route path="/" element={<Home />} />

          {/* URL of Login Page */}
          <Route path="/login" element={<Login />} />

          {/* URL of Homeowner Dashboard */}
          <Route path="/dashboard" element={<HomeownerDashboard />} />

          {/* Temporary Local Test Route for Technician Onboarding */}
         <Route path="/register-technician" element={<TechnicianOnboarding />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;