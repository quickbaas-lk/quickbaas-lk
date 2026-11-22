import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const OnboardingNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="onboarding-navbar">
      <div className="onboarding-navbar-inner">
        <Link to="/" className="onboarding-brand">
          <img src="/main.png" alt="QuickBaas Logo" className="nav-logo" />
        </Link>

        <div className="onboarding-navbar-actions">
          <span className="onboarding-badge">
            <ShieldCheck size={16} /> Technician Partner Portal
          </span>
          <button
            type="button"
            className="onboarding-back-home-btn"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>
    </header>
  );
};

export default OnboardingNavbar;