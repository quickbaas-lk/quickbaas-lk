import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const ToNavbar = () => {
  return (
    <nav className="navbar-container">
      <div className="logo">
        <Link to="/">
          <img src="/main.png" alt="QuickBaas Logo" className="nav-logo" />
        </Link>
      </div>

      <div className="nav-actions">
        <span className="onboarding-badge">
          <ShieldCheck size={16} /> Technician Partner Portal
        </span>
        <Link to="/" className="onboarding-back-home-btn">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </nav>
  );
};

export default ToNavbar;