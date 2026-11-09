
import { useState } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import HomeownerDashboard from './pages/HomeownerDashboard';
import TechnicianRegister from './pages/TechnicianRegister';

import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">

      {currentPage === 'home' && (
        <Home
          onLoginClick={() => setCurrentPage('login')}
        />
      )}

      {currentPage === 'login' && (
        <Login
          onLoginSuccess={() => setCurrentPage('dashboard')}
          onNavigateToRegister={() =>
            setCurrentPage('technicianRegister')
          }
        />
      )}

      {currentPage === 'dashboard' && (
        <HomeownerDashboard />
      )}

      {currentPage === 'technicianRegister' && (
        <TechnicianRegister />
      )}

    </div>
  );
}

export default App;
