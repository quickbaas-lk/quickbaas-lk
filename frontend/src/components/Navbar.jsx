import { Link } from 'react-router-dom'; /* after importing the react-router-dom */
import { User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="navbar-container">
      <div className="logo">
        <Link to="/"> {/* after importing the react-router-dom */}
          <img src="/main.png" alt="QuickBaas Logo" className="nav-logo" />
        </Link>
      </div>

      <nav className="nav-links">
        <a href="#services">Explore Services</a>
        <a href="#how-it-works">How it Works</a>
        <a href="#verified">Verified Pros</a>
      </nav>

      <div className="nav-actions">
        <button className="lang-btn">EN</button>
        
        <Link to="/login" className="login-btn"> {/* after importing the react-router-dom */}
          Log in
        </Link>
        
        <Link to="/register-technician" className="join-btn"> {/* after importing the react-router-dom */}
          Join as technician <User size={16} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;