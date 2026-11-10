import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import Footer from '../components/Footer';
import { 
  MapPin, CheckCircle, Search, 
  MessageSquare, ExternalLink, Star, Shield, Clock
} from 'lucide-react';

export default function HomeownerDashboard() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="dashboard-page">
      <DashboardNavbar />

      <div className="dashboard-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-header">
            <div>
              <div className="location-pill">
                <MapPin size={14} />
                <span>Current Location: <strong>Colombo 07</strong></span>
              </div>
              <h1 className="welcome-title">Hello, Doe!</h1>
              <p className="welcome-subtitle">What needs fixing around your home today?</p>
            </div>
            
            <div className="status-badge">
              <Shield size={20} color="#15803d" />
              <div>
                <span className="status-label">ACCOUNT STATUS</span>
                <span className="status-val">Verified Homeowner ✓</span>
              </div>
            </div>
          </div>

          {/* Dashboard Search Box */}
          <form onSubmit={handleSearch} className="dashboard-search-box">
            <div className="search-input">
              <Search size={18} />
              <input type="text" placeholder="Search for plumbers, electricians..." />
            </div>
            <div className="location-input">
              <MapPin size={18} />
              <input type="text" defaultValue="Colombo 07" />
            </div>
            <button type="submit" className="find-tech-btn">Find Technicians →</button>
          </form>
        </div>

        {/* Active Booking Card */}
        <div className="dashboard-section">
          <div className="active-booking-card">
            <div className="active-booking-info">
              <div className="booking-badge">Active Service</div>
              <div>
                <span className="service-tag">• AC Maintenance & Gas Refill</span>
                <h3>Active Booking with Sunil Perera</h3>
                <p>Technician has reviewed your request and submitted an estimate of <strong>Rs. 4,500</strong>.</p>
              </div>
            </div>
            <div className="active-booking-actions">
              <button className="chat-btn" onClick={() => navigate('/chat')}>
                <MessageSquare size={16} /> Chat
              </button>
              <button className="view-estimate-btn" onClick={() => navigate('/estimates')}>
                View Estimate <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Technicians Grid */}
        <div className="dashboard-section">
          <div className="section-header">
            <div>
              <span className="sub-title">CATEGORIES</span>
              <h2>Explore Professional Services</h2>
            </div>
          </div>

          <div className="technicians-grid">
            {/* Tech 1 */}
            <div className="technician-card">
              <div className="tech-header">
                <div className="tech-details">
                  <h4>Sunil Perera</h4>
                  <p className="tech-role">HVAC Specialist</p>
                </div>
                <div className="tech-rating">
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  <span>4.9</span>
                </div>
              </div>
              <div className="tech-meta">
                <span><Clock size={14} /> 15 mins away</span>
                <span><CheckCircle size={14} color="#15803d" /> 42 jobs done</span>
              </div>
              <div className="tech-footer">
                <div>
                  <span className="price-label">Starting from</span>
                  <span className="price-value">Rs. 3,500</span>
                </div>
                <button className="book-now-btn" onClick={() => navigate('/book')}>Book Now</button>
              </div>
            </div>

            {/* Tech 2 */}
            <div className="technician-card">
              <div className="tech-header">
                <div className="tech-details">
                  <h4>Nimal Silva</h4>
                  <p className="tech-role">Master Electrician</p>
                </div>
                <div className="tech-rating">
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  <span>4.8</span>
                </div>
              </div>
              <div className="tech-meta">
                <span><Clock size={14} /> 25 mins away</span>
                <span><CheckCircle size={14} color="#15803d" /> 38 jobs done</span>
              </div>
              <div className="tech-footer">
                <div>
                  <span className="price-label">Starting from</span>
                  <span className="price-value">Rs. 3,000</span>
                </div>
                <button className="book-now-btn" onClick={() => navigate('/book')}>Book Now</button>
              </div>
            </div>

            {/* Tech 3 */}
            <div className="technician-card">
              <div className="tech-header">
                <div className="tech-details">
                  <h4>Kumara Fernando</h4>
                  <p className="tech-role">Expert Plumber</p>
                </div>
                <div className="tech-rating">
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  <span>4.9</span>
                </div>
              </div>
              <div className="tech-meta">
                <span><Clock size={14} /> 10 mins away</span>
                <span><CheckCircle size={14} color="#15803d" /> 56 jobs done</span>
              </div>
              <div className="tech-footer">
                <div>
                  <span className="price-label">Starting from</span>
                  <span className="price-value">Rs. 2,500</span>
                </div>
                <button className="book-now-btn" onClick={() => navigate('/book')}>Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}