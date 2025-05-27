import React from 'react';
import './supportOptions.css';
import personImg from '../../../assets/person.png';
import { useNavigate } from 'react-router-dom';

const SupportOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="advisor-banner-container">
      <div className="advisor-banner">
        <div className="advisor-banner-left">
          <img src={personImg} alt="Financial Advisor Icon" className="advisor-icon" />
          <div className="advisor-texts">
            <h2 className="advisor-main-title">More on aging well ...</h2>
            <div className="advisor-title-desc">
              <h3 className="advisor-title">Financial Advisor In Your Location</h3>
              <p className="advisor-desc">Check if a financial advisor in your area is currently registered and active before making decisions</p>
            </div>
          </div>
        </div>
        <button className="advisor-btn" onClick={() => navigate('/advisors')}>Check Advisor</button>
      </div>
    </div>
  );
};

export default SupportOptions;
