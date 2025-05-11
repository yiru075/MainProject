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
  const [invalidChar, setInvalidChar] = useState(false);
  const [invalidLength, setInvalidLength] = useState(false);

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

  const handleSuburbChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s,]*$/;

    if (regex.test(value)) {
      if (value.length <= 80) {
        setSuburb(value);
        setInvalidChar(false);
        setInvalidLength(value.length > 0 && value.length < 2);
      } else {
        setInvalidLength(true);
      }
    } else {
      setInvalidChar(true);
    }
  };

  const handleIncomeChange = (e) => {
    const value = e.target.value;
    const regex = /^\d{0,6}(\.\d{0,2})?$/;
    if (regex.test(value) || value === '') {
      setIncome(value);
    }
  };

  const handleRentChange = (e) => {
    const value = e.target.value;
    const regex = /^\d{0,6}(\.\d{0,2})?$/;
    if (regex.test(value) || value === '') {
      setRent(value);
    }
  };

  const validateIncome = () => {
    const trimmed = income.trim();

    if (/^0\d+/.test(trimmed)) {
      setErrors((prev) => ({
        ...prev,
        income: 'Leading zeros are not allowed.'
      }));
      return false;
    }

    const formatValid = /^(0|[1-9]\d{0,5})(\.\d{1,2})?$/.test(trimmed);
    if (!formatValid) {
      setErrors((prev) => ({
        ...prev,
        income: 'Max 6 digits before decimal and 2 after decimal.'
      }));
      return false;
    }

    const value = parseFloat(income);
    if (isNaN(value) || value < 1) {
      setErrors((prev) => ({ ...prev, income: 'Income must be a positive number(min 1 AUD).' }));
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
    const trimmed = rent.trim();

    if (/^0\d+/.test(trimmed)) {
      setErrors((prev) => ({
        ...prev,
        rent: 'Leading zeros are not allowed.'
      }));
      return false;
    }

    const formatValid = /^(0|[1-9]\d{0,5})(\.\d{1,2})?$/.test(trimmed);
    if (!formatValid) {
      setErrors((prev) => ({
        ...prev,
        rent: 'Max 6 digits before decimal and 2 after decimal.'
      }));
      return false;
    }

    const value = parseFloat(rent);
    if (isNaN(value) || value < 1) {
      setErrors((prev) => ({ ...prev, rent: 'Rent must be a positive number(min 1 AUD).' }));
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
    const isSuburbValid = suburb.trim() !== '' && !noMatch;;

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

  };

  const handleReset = () => {
    setSuburb('');
    setIncome('');
    setRent('');
    setRentRatio(null);
    setErrors({ suburb: '', income: '', rent: '' });
    setSearchResults([]);
    setInvalidChar(false);
    setInvalidLength(false);
    setSkipNextSearch(false); 
    setNoMatch(false);
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
      <div className="form-intro">
        <h2>Rent Sustainability Check</h2>
        <p>
          Use this tool to check whether your weekly rent is sustainable based on your income.
          This helps you understand your housing affordability and discover more affordable suburbs if needed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-section">
          <label className="form-label">
            1. Which suburb do you currently live in Victoria, Australia?
          </label>
          <div className="suburb-input-wrapper">
            <input
              type="text"
              value={suburb}
              onChange={handleSuburbChange}
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
          {invalidChar && (
            <p className="form-error">Only English letters, spaces and commas are allowed.</p>
          )}

          {invalidLength && (
            <p className="form-error">Suburb name must be between 2 and 80 characters.</p>
          )}


          {errors.suburb && <p className="form-error">{errors.suburb}</p>}
        </div>

        <div className="form-section">
          <label className="form-label">2. What is your weekly income (AUD)?</label>
          <input
            type="text"
            value={income}
            onChange={handleIncomeChange}
            onBlur={validateIncome}
            className="form-input"
            placeholder="Enter value between 1 and 250000 in AUD"
          />
          {errors.income && <p className="form-error">{errors.income}</p>}
        </div>

        <div className="form-section">
          <label className="form-label">3. What is your weekly rent (AUD)?</label>
          <input
            type="text"
            value={rent}
            onChange={handleRentChange}
            onBlur={validateRent}
            className="form-input"
            placeholder="Enter value between 1 and 20000 in AUD"
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
                    <p style={{ color: '#fd622e' }}>
                      <strong>Affordability Level: Level 3 (UNAFFORDABLE)</strong><br />
                      This is above the recommended 35% threshold.<br />
                      Safe and Settled will help you discover nearby suburbs with better rent-to-income ratios.
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
