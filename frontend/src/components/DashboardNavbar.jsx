import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const DashboardNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar-container">
      <div className="logo">
        <Link to="/">
          <img src="/main.png" alt="QuickBaas Logo" className="nav-logo" />
        </Link>
      </div>

      <div className="nav-actions">
        <button onClick={() => navigate('/')} className="logout-btn">
          <LogOut size={16} /> Log out
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;