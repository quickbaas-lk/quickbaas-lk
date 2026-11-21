import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import HomeownerDashboard from './pages/HomeownerDashboard';
import ServiceRequestStep1 from './pages/ServiceRequestStep1';
import './App.css';

function AppRoutes() {
  const navigate = useNavigate();

  const handleNextStep = (step1Data) => {
    console.log('Service Request Step 1 Data:', step1Data);
    // Step 1 data ටික state එකත් එක්ක Step 2 route එකට යවමු
    navigate('/service-request/location', { state: { step1Data } });
  };

  return (
    <Routes>
      {/* URL of Landing Page */}
      <Route path="/" element={<Home />} />

      {/* URL of Login Page */}
      <Route path="/login" element={<Login />} />

      {/* URL of Homeowner Dashboard */}
      <Route path="/dashboard" element={<HomeownerDashboard />} />

      {/* URL of Service Request - Step 1 */}
      <Route
        path="/service-request"
        element={<ServiceRequestStep1 onNextStep={handleNextStep} />}
      />

      {/* Temporary Placeholder for Step 2 (Location) */}
      <Route
        path="/service-request/location"
        element={
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Step 2 of 3: Location (Coming Next)</h2>
            <p>Step 1 data successfully received!</p>
          </div>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;