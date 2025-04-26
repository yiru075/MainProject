import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './sustainability.css';

const Sustainability = () => {
  const navigate = useNavigate();
  const selectedRef = useRef(null);

  const [suburb, setSuburb] = useState('');
  const [income, setIncome] = useState('');
  const [rent, setRent] = useState('');
  const [rentRatio, setRentRatio] = useState(null);
  const [errors, setErrors] = useState({
    suburb: '',
    income: '',
    rent: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [skipNextSearch, setSkipNextSearch] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const trimmed = suburb.trim();
      if (skipNextSearch) {
        setSkipNextSearch(false);
        return;
      }
      if (trimmed === '') {
        setSearchResults([]);
        setNoMatch(false);
        return;
      }
      handleSearch(trimmed);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [suburb]);

  const handleSearch = async (query) => {
    if (!query || query.trim() === '') {
      setSearchResults([]);
      setNoMatch(false);
      return;
    }

    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_WEBSITE_URL;
      const response = await fetch(`${baseUrl}/api/suburb_search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch search results');
      const data = await response.json();
      const results = data.results || [];
      setSearchResults(results);
      setNoMatch(results.length === 0);
    } catch (error) {
      console.error('Error fetching suburb search results:', error);
      setSearchResults([]);
      setNoMatch(true);
    } finally {
      setIsLoading(false);
    }
  };

  const validateIncome = () => {
    const value = parseFloat(income);
    if (isNaN(value) || value < 0) {
      setErrors((prev) => ({ ...prev, income: 'Income must be 0 or a positive number.' }));
      return false;
    } else if (value > 250000) {
      setErrors((prev) => ({ ...prev, income: 'Income must not exceed 250,000 AUD.' }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, income: '' }));
      return true;
    }
  };

  const validateRent = () => {
    const value = parseFloat(rent);
    if (isNaN(value) || value < 0) {
      setErrors((prev) => ({ ...prev, rent: 'Rent must be 0 or a positive number.' }));
      return false;
    } else if (value > 20000) {
      setErrors((prev) => ({ ...prev, rent: 'Rent must not exceed 20,000 AUD.' }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, rent: '' }));
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isIncomeValid = validateIncome();
    const isRentValid = validateRent();
    const isSuburbValid = suburb.trim() !== '';

    if (!isSuburbValid) {
      setErrors((prev) => ({ ...prev, suburb: 'Please select a suburb' }));
    }

    if (!isSuburbValid || !isIncomeValid || !isRentValid) {
      setRentRatio(null);
      return;
    }

    const incomeVal = parseFloat(income);
    const rentVal = parseFloat(rent);
    const ratio = (rentVal / incomeVal) * 100;
    const ratioFormatted = ratio.toFixed(2);
    setRentRatio(ratioFormatted);

    const userData = {
      suburb,
      income: incomeVal,
      rent: rentVal,
      rentRatio: ratioFormatted,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('sustainabilityData', JSON.stringify(userData));

    setSuburb('');
    setIncome('');
    setRent('');
    setSearchResults([]);
    setNoMatch(false);
  };

  const handleReset = () => {
    setSuburb('');
    setIncome('');
    setRent('');
    setRentRatio(null);
    setErrors({ suburb: '', income: '', rent: '' });
    setSearchResults([]);
    localStorage.removeItem('sustainabilityData');
  };

  const handleSuburbSelect = (name) => {
    setSuburb(name);
    setSearchResults([]);
    setNoMatch(false);
    setSkipNextSearch(true);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-section">
          <label className="form-label">
            1. Which suburb do you currently live in Victoria, Australia?
          </label>
          <div className="suburb-input-wrapper">
            <input
              type="text"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              className="form-input"
              placeholder="Enter suburb name"
            />

            {isLoading && <p className="form-info">Loading...</p>}

            {searchResults.length > 0 && suburb.trim() !== '' && (
              <ul className="search-results" role="listbox">
                {searchResults.map((result, index) => (
                  <li
                    key={index}
                    className="search-result-item"
                    onClick={() => handleSuburbSelect(result.name)}
                    role="option"
                  >
                    {result.name}
                  </li>
                ))}
              </ul>
            )}

            {noMatch && !isLoading && suburb.trim() !== '' && (
              <p className="form-error">No matching suburbs found in Victoria.</p>
            )}
          </div>


          {noMatch && !isLoading && suburb.trim() !== '' && (
            <p className="form-error">No matching suburbs found in Victoria.</p>
          )}
        </div>

        <div className="form-section">
          <label className="form-label">2. What is your weekly income (AUD)?</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="250000"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            onBlur={validateIncome}
            className="form-input"
            placeholder="e.g. 1250.50"
          />
          {errors.income && <p className="form-error">{errors.income}</p>}
        </div>

        <div className="form-section">
          <label className="form-label">3. What is your weekly rent (AUD)?</label>
          <input
            type="number"
            step="0"
            min="0"
            max="20000"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            onBlur={validateRent}
            className="form-input"
            placeholder="e.g. 450.00"
          />
          {errors.rent && <p className="form-error">{errors.rent}</p>}
        </div>

        <div className="form-button-wrapper">
          <button type="submit" className="form-submit-btn">
            Submit
          </button>
          <button type="button" className="form-reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>

        {rentRatio !== null && (
          <>
            <div className="form-ratio-info">
              <p>
                💡 Your rent accounts for <strong>{rentRatio}%</strong> of your weekly income.
              </p>

              {(() => {
                const ratio = parseFloat(rentRatio);
                if (ratio <= 30) {
                  return (
                    <p style={{ color: 'green' }}>
                      <strong>Affordability Level: Level 1 (AFFORDABLE)</strong><br />
                      You are within the safe housing affordability range.
                    </p>
                  );
                } else if (ratio <= 35) {
                  return (
                    <p style={{ color: '#e67e22' }}>
                      <strong>Affordability Level: Level 2 (AT RISK)</strong><br />
                      You are near the affordability threshold.
                    </p>
                  );
                } else {
                  return (
                    <p style={{ color: 'red' }}>
                      <strong>Affordability Level: Level 3 (UNAFFORDABLE)</strong><br />
                      This is above the recommended 35% threshold.<br />
                      WellbeingHub will help you discover nearby suburbs with better rent-to-income ratios.
                    </p>
                  );
                }
              })()}

              <table style={{ width: '100%', marginTop: '12px', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Rent-to-Income Ratio</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Explanation</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>≤ 30%</td>
                    <td>Affordable</td>
                    <td>Level 1</td>
                  </tr>
                  <tr>
                    <td>30% – 35%</td>
                    <td>At Risk</td>
                    <td>Level 2</td>
                  </tr>
                  <tr>
                    <td>&gt; 35%</td>
                    <td>Unaffordable</td>
                    <td>Level 3</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="discover-button-wrapper">
              <button className="continue-btn" type="button" onClick={() => navigate('/housing')}>
                Discover Rent
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Sustainability;
