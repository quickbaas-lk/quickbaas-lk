
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      setError(false);
      navigate('/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-brand-header">
        <Link
          to="/"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <h2>
            Quick<span>Baas</span>.lk
          </h2>
        </Link>

        <p>Verified Repair Technicians Marketplace</p>
      </div>

      <div className="login-card">
        <div className="login-card-title">
          <h3>Log in</h3>
          <p>Welcome back, please enter your details.</p>
        </div>

        {error && (
          <div className="login-error-alert">
            <AlertCircle size={16} />
            <span>
              Incorrect email or password. Please try again.
            </span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email or Phone Number</label>

            <div className="input-with-icon">
              <Mail size={18} className="field-icon" />

              <input
                type="text"
                placeholder="support@quickbaas.lk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="password-label-row">
              <label>Password</label>

              <a
                href="#forgot"
                onClick={(e) => e.preventDefault()}
                className="forgot-link"
              >
                Forgot password?
              </a>
            </div>

            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            Log in →
          </button>
        </form>

        <div className="login-footer-text">
          Don't have an account?{' '}
          <Link
            to="/technician-register"
            className="text-link-btn"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="ssl-secure-badge">
        <ShieldCheck size={16} color="#15803d" />
        <span>Secure 256-Bit SSL Encrypted Login</span>
      </div>
    </div>
  );
}
