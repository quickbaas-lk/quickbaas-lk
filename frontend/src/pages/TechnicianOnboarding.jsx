import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Briefcase,
  ArrowRight,
  Check,
  MapPin,
} from 'lucide-react';
import ToNavbar from '../components/ToNavbar';
import '../styles/TechnicianOnboarding.css';

const TRADE_SKILLS = [
  'Plumber',
  'Electrician',
  'AC Repair',
  'Carpenter',
  'Masonry',
  'CCTV & Security',
];

const SRI_LANKA_DISTRICTS = [
  'Colombo District',
  'Gampaha District',
  'Kalutara District',
  'Kandy District',
  'Matale District',
  'Nuwara Eliya District',
  'Galle District',
  'Matara District',
  'Hambantota District',
  'Jaffna District',
  'Kilinochchi District',
  'Mannar District',
  'Vavuniya District',
  'Mullaitivu District',
  'Batticaloa District',
  'Ampara District',
  'Trincomalee District',
  'Kurunegala District',
  'Puttalam District',
  'Anuradhapura District',
  'Polonnaruwa District',
  'Badulla District',
  'Monaragala District',
  'Ratnapura District',
  'Kegalle District',
];

const STATUS_TABS = [
  { id: 'active', label: 'Active Flow' },
  { id: 'pending', label: 'Pending Review' },
  { id: 'verified', label: 'Verified Partner' },
];

const STEPS = [
  { number: 1, title: 'STEP 01', label: 'Profile Setup' },
  { number: 2, title: 'STEP 02', label: 'NIC Upload' },
  { number: 3, title: 'STEP 03', label: 'Review & Status' },
];

function TechnicianOnboarding() {
  const navigate = useNavigate();
  const currentStep = 1; // this page is Step 1 

  const [statusTab, setStatusTab] = useState('active');
  const [selectedSkills, setSelectedSkills] = useState(['Plumber']);
  const [district, setDistrict] = useState('Colombo District');
  const [hourlyRate, setHourlyRate] = useState('2500');
  const [summary, setSummary] = useState(
    'Licensed electrical technician with 8 years of solid background in domestic troubleshooting and smart home integrations.'
  );
  const [errorMsg, setErrorMsg] = useState('');

  const handleToggleSkill = (skill) => {
    setErrorMsg('');
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((item) => item !== skill);
      }
      if (prev.length >= 3) {
        setErrorMsg('You can select up to 3 primary trade skills only.');
        return prev;
      }
      return [...prev, skill];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedSkills.length === 0) {
      setErrorMsg('Please select at least 1 primary trade skill.');
      return;
    }

    if (!district.trim()) {
      setErrorMsg('Please select your primary service district.');
      return;
    }

    const numericRate = Number(hourlyRate);
    if (!hourlyRate || Number.isNaN(numericRate) || numericRate <= 0) {
      setErrorMsg('Please enter a valid base hourly rate in LKR.');
      return;
    }

    if (!summary.trim()) {
      setErrorMsg('Please enter your professional summary and experience.');
      return;
    }

    setErrorMsg('');

    const step1Data = {
      skills: selectedSkills,
      district,
      hourlyRate: numericRate,
      summary: summary.trim(),
    };

    // pass the data from react-router-dom to next step
    navigate('/technician-onboarding/nic-upload', { state: { step1Data } });
  };

  return (
    <div className="qb-onboarding-page">
      <ToNavbar />

      <div className="qb-onboarding-wrapper">
        <div className="qb-onboarding-container">
          {/* Top Header Row */}
          <header className="qb-onboarding-header">
            <div className="qb-onboarding-title-group">
              <span className="qb-partner-badge">
                <ShieldCheck size={14} strokeWidth={2.2} />
                QuickBaas.lk Partner Network
              </span>
              <h1 className="qb-onboarding-title">
                Technician Onboarding &amp; Verification
              </h1>
              <p className="qb-onboarding-subtitle">
                Complete your professional profile and submit identity documents to
                start accepting high-paying local repair jobs.
              </p>
            </div>

            {/* Right Status Switcher */}
            <div
              className="qb-status-switcher"
              role="tablist"
              aria-label="Onboarding status view"
            >
              {STATUS_TABS.map((tab) => {
                const isActive = statusTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setStatusTab(tab.id)}
                    className={`qb-status-btn ${isActive ? 'is-active' : ''}`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </header>

          {/* 3-Step Progress Cards */}
          <section className="qb-steps-grid" aria-label="Onboarding steps">
            {STEPS.map((step) => {
              const isActiveStep = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div
                  key={step.number}
                  className={`qb-step-card ${isActiveStep ? 'is-active' : ''} ${
                    isCompleted ? 'is-completed' : ''
                  }`}
                >
                  <div className="qb-step-circle">
                    {isCompleted ? (
                      <Check size={15} strokeWidth={2.5} />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="qb-step-meta">
                    <span className="qb-step-code">{step.title}</span>
                    <span className="qb-step-name">{step.label}</span>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Main Profile Setup Form Card */}
          <form className="qb-profile-card" onSubmit={handleSubmit} noValidate>
            <div className="qb-card-header">
              <div>
                <h2 className="qb-card-title">
                  Professional Profile &amp; Skills
                </h2>
                <p className="qb-card-subtitle">
                  Specify your trades, operational districts, and standard service
                  rates.
                </p>
              </div>
              <div className="qb-card-icon-badge" aria-hidden="true">
                <Briefcase size={18} strokeWidth={2} />
              </div>
            </div>

            {/* Trade Skills Selection */}
            <div className="qb-field-group">
              <label className="qb-field-label">
                Select Primary Trade Skills (Choose up to 3)
              </label>
              <div className="qb-skills-list">
                {TRADE_SKILLS.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleToggleSkill(skill)}
                      aria-pressed={isSelected}
                      className={`qb-skill-pill ${
                        isSelected ? 'is-selected' : ''
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* District & Base Hourly Rate Row */}
            <div className="qb-two-col-grid">
              <div className="qb-field-group">
                <label htmlFor="qb-district" className="qb-field-label">
                  Primary Service District
                </label>
                <div className="qb-input-box">
                  <MapPin size={16} className="qb-input-icon" />
                  <select
                    id="qb-district"
                    value={district}
                    onChange={(e) => {
                      setErrorMsg('');
                      setDistrict(e.target.value);
                    }}
                    className="qb-select-input"
                  >
                    {SRI_LANKA_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="qb-field-group">
                <label htmlFor="qb-hourly-rate" className="qb-field-label">
                  Base Hourly Rate (LKR - Rs.)
                </label>
                <div className="qb-input-box">
                  <span className="qb-currency-prefix">Rs.</span>
                  <input
                    id="qb-hourly-rate"
                    type="number"
                    min="0"
                    step="50"
                    value={hourlyRate}
                    onChange={(e) => {
                      setErrorMsg('');
                      setHourlyRate(e.target.value);
                    }}
                    placeholder="2500"
                    className="qb-text-input qb-rate-input"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary & Experience */}
            <div className="qb-field-group">
              <label htmlFor="qb-summary" className="qb-field-label">
                Professional Summary &amp; Years of Experience
              </label>
              <textarea
                id="qb-summary"
                rows={4}
                value={summary}
                onChange={(e) => {
                  setErrorMsg('');
                  setSummary(e.target.value);
                }}
                placeholder="Describe your trade background, years of experience, and specialties..."
                className="qb-textarea-input"
              />
            </div>

            {errorMsg && (
              <div className="qb-validation-alert" role="alert">
                {errorMsg}
              </div>
            )}

            {/* Primary Action Button */}
            <div className="qb-card-footer">
              <button type="submit" className="qb-primary-btn">
                <span>Proceed to NIC Verification</span>
                <ArrowRight size={17} strokeWidth={2.2} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TechnicianOnboarding;