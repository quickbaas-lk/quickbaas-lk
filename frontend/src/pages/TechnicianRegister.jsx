import { useState } from 'react';

const tradeSkills = [
  'Plumber',
  'Electrician',
  'AC Repair',
  'Carpenter',
  'Masonry',
  'CCTV & Security',
];

const districts = [
  'Colombo District',
  'Gampaha District',
  'Kalutara District',
  'Kandy District',
  'Galle District',
  'Matara District',
  'Kurunegala District',
  'Ratnapura District',
  'Jaffna District',
  'Other District',
];

function TechnicianRegister() {
  const [selectedSkills, setSelectedSkills] = useState(['Plumber']);
  const [district, setDistrict] = useState('Colombo District');
  const [hourlyRate, setHourlyRate] = useState('2500');
  const [professionalSummary, setProfessionalSummary] = useState(
    'Licensed electrical technician with 8 years of solid background in domestic troubleshooting and smart home integrations.'
  );

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSkillToggle = (skill) => {
    setSuccessMessage('');

    setSelectedSkills((previousSkills) => {
      if (previousSkills.includes(skill)) {
        return previousSkills.filter((item) => item !== skill);
      }

      if (previousSkills.length >= 3) {
        setErrors((previousErrors) => ({
          ...previousErrors,
          skills: 'You can select a maximum of 3 skills.',
        }));

        return previousSkills;
      }

      setErrors((previousErrors) => ({
        ...previousErrors,
        skills: '',
      }));

      return [...previousSkills, skill];
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (selectedSkills.length === 0) {
      newErrors.skills = 'Please select at least one trade skill.';
    }

    if (!district) {
      newErrors.district = 'Please select your service district.';
    }

    if (!hourlyRate || Number(hourlyRate) <= 0) {
      newErrors.hourlyRate = 'Please enter a valid hourly rate.';
    }

    if (professionalSummary.trim().length < 20) {
      newErrors.professionalSummary =
        'Please enter at least 20 characters about your experience.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage(
        'Profile details completed! You can proceed to NIC verification.'
      );
    }
  };

  return (
    <div className="technician-register-page">
      <div className="technician-register-container">

        {/* Header */}
        <header className="technician-register-header">
          <div>
            <span className="partner-badge">
              🛡 QuickBaas.lk Partner Network
            </span>

            <h1>Technician Onboarding & Verification</h1>

            <p>
              Complete your professional profile and submit identity
              documents to start accepting high-paying local repair jobs.
            </p>
          </div>

          <div className="partner-status">
            <div className="status-item active">
              Active Flow
            </div>

            <div className="status-item">
              Pending Review
            </div>

            <div className="status-item">
              Verified Partner
            </div>
          </div>
        </header>

        {/* Progress Steps */}
        <div className="technician-steps">
          <div className="technician-step active">
            <span className="step-circle">1</span>

            <div>
              <small>STEP 01</small>
              <strong>Profile Setup</strong>
            </div>
          </div>

          <div className="technician-step">
            <span className="step-circle">2</span>

            <div>
              <small>STEP 02</small>
              <strong>NIC Upload</strong>
            </div>
          </div>

          <div className="technician-step">
            <span className="step-circle">3</span>

            <div>
              <small>STEP 03</small>
              <strong>Review & Status</strong>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form
          className="technician-profile-card"
          onSubmit={handleSubmit}
        >
          <div className="profile-card-heading">
            <div>
              <h2>Professional Profile & Skills</h2>

              <p>
                Specify your trades, operational districts, and
                standard service rates.
              </p>
            </div>

            <span className="profile-icon">♧</span>
          </div>

          {/* Trade Skills */}
          <div className="technician-form-group">
            <label>
              Select Primary Trade Skills (Choose up to 3)
            </label>

            <div className="trade-skills-list">
              {tradeSkills.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  className={`trade-skill ${
                    selectedSkills.includes(skill) ? 'selected' : ''
                  }`}
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>

            {errors.skills && (
              <p className="technician-error">{errors.skills}</p>
            )}
          </div>

          {/* District and Hourly Rate */}
          <div className="technician-form-row">

            <div className="technician-form-group">
              <label htmlFor="serviceDistrict">
                Primary Service District
              </label>

              <select
                id="serviceDistrict"
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
              >
                <option value="">Select District</option>

                {districts.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {errors.district && (
                <p className="technician-error">{errors.district}</p>
              )}
            </div>

            <div className="technician-form-group">
              <label htmlFor="hourlyRate">
                Base Hourly Rate (LKR - Rs.)
              </label>

              <input
                id="hourlyRate"
                type="number"
                min="1"
                value={hourlyRate}
                onChange={(event) => setHourlyRate(event.target.value)}
                placeholder="Rs. 2500"
              />

              {errors.hourlyRate && (
                <p className="technician-error">
                  {errors.hourlyRate}
                </p>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="technician-form-group">
            <label htmlFor="professionalSummary">
              Professional Summary & Years of Experience
            </label>

            <textarea
              id="professionalSummary"
              rows="4"
              value={professionalSummary}
              onChange={(event) =>
                setProfessionalSummary(event.target.value)
              }
              placeholder="Describe your professional experience..."
            />

            {errors.professionalSummary && (
              <p className="technician-error">
                {errors.professionalSummary}
              </p>
            )}
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="technician-success-message">
              {successMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="technician-form-footer">
            <button
              type="submit"
              className="technician-proceed-button"
            >
              Proceed to NIC Verification →
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default TechnicianRegister;