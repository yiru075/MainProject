import React from 'react';
import './supportOptions.css';
import personImg from '../../../assets/person.png';
import handImg from '../../../assets/hand.png';
import { useNavigate } from 'react-router-dom';

const SupportOptions = () => {
  const navigate = useNavigate();
  
  return (
    <div className="support-options-container">
      <div className="option-card">
        <img src={personImg} alt="Financial Advisor Icon" className="option-icon" />
        <h3 className="option-title">Financial Advisor In<br />Your Location</h3>
        <button className="option-button" onClick={() => navigate('/advisors')}>Get Advice</button>
      </div>

      <div className="option-card">
        <img src={handImg} alt="Safety Icon" className="option-icon" />
        <h3 className="option-title">Safety Level Of Your<br />Desired Suburb</h3>
        <button className="option-button" onClick={() => navigate('/calculation')}>Check now</button>
      </div>
    </div>
  );
};

export default SupportOptions;
