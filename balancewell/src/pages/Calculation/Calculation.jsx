import { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { supabase } from '../../../supabaseClient';
import './Calculation.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Supabase token for authentication
const SUPABASE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkbHhlZ2Vlam5rdW1kenhzcXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTAyOTksImV4cCI6MjA2MDg4NjI5OX0.Pt5uEQC9e7U5mJj7TJWYFEkXjq19glVfDJsKeukSfLw';

function Calculation() {
  // State variables
  const [suburb, setSuburb] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [savings, setSavings] = useState('');
  const [propertyType, setPropertyType] = useState('1 Bed Flat');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Handle outside click for suburb suggestions dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch suburb suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (suburb.length > 0) {
        try {
          // Using URL parameters as shown in the provided Supabase function
          const response = await fetch(
            `https://xdlxegeejnkumdzxsqzs.supabase.co/functions/v1/suburb_suggestions?q=${encodeURIComponent(suburb)}`, 
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_TOKEN}`
              }
            }
          );
          
          if (!response.ok) throw new Error('Failed to fetch suggestions');
          
          const data = await response.json();
          setSuggestions(data.suggestions || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    // Debounce the API calls
    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [suburb]);

  // Handle suburb selection
  const handleSelectSuburb = (selected) => {
    setSuburb(selected);
    setShowSuggestions(false);
  };

  // Calculate sustainability years
  const calculateYears = async () => {
    if (!suburb || !savings || !propertyType) {
      alert('Please fill in all fields');
      return;
    }

    const savingsValue = parseInt(savings);
    if (savingsValue < 10000 || savingsValue > 310000) {
      alert('Please enter a budget between $10,000 and $310,000');
      return;
    }

    setLoading(true);
    
    try {
      // Using POST method as shown in the provided Supabase function
      const response = await fetch(
        'https://xdlxegeejnkumdzxsqzs.supabase.co/functions/v1/Year-calculation', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_TOKEN}`
          },
          body: JSON.stringify({
            suburb: suburb.toLowerCase(),
            property_type: propertyType,
            budget: savingsValue
          })
        }
      );
      
      if (!response.ok) throw new Error('Failed to calculate years');
      
      const data = await response.json();
      setResults(data);
      
      // Scroll to results
      setTimeout(() => {
        document.querySelector('.results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      
    } catch (error) {
      console.error('Error calculating years:', error);
      alert('Error calculating sustainability. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format weekly rent for display
  const formatWeeklyRent = (annualRent) => {
    const weeklyRent = annualRent / 52;
    return Math.round(weeklyRent);
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value);
  };

  // Filter valid recommendations (years > 0)
  const getValidRecommendations = () => {
    if (!results?.recommendations) return [];
    return results.recommendations.filter(rec => rec.years > 0);
  }

  // Check if all recommendations have 0 years
  const hasNoValidRecommendations = () => {
    if (!results?.recommendations) return false;
    return results.recommendations.every(rec => rec.years === 0);
  }

  // Prepare chart data
  const chartData = {
    labels: getValidRecommendations().map(rec => rec.suburb) || [],
    datasets: [
      {
        label: 'Years Affordable',
        data: getValidRecommendations().map(rec => rec.years) || [],
        backgroundColor: [
          'rgba(255, 184, 76, 0.8)',
          'rgba(255, 154, 0, 0.8)',
          'rgba(255, 133, 0, 0.8)',
          'rgba(255, 112, 0, 0.8)',
          'rgba(255, 91, 0, 0.8)',
        ],
        borderColor: [
          'rgba(255, 184, 76, 1)',
          'rgba(255, 154, 0, 1)',
          'rgba(255, 133, 0, 1)',
          'rgba(255, 112, 0, 1)',
          'rgba(255, 91, 0, 1)',
        ],
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        usePointStyle: true,
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: (context) => `Years affordable: ${context.raw} years`,
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#666',
        },
        title: {
          display: true,
          text: 'Years',
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#666',
        }
      }
    }
  };

  return (
    <div className="calculation-container">
      <div className="hero-section">
        <h1>Project Your Rent Sustainability Over Time</h1>
        <p>
          Use this tool to estimate how long your current rental budget can sustain
          you in a selected suburb. We calculate this based on median weekly rent
          and historical rent inflation, helping you plan ahead with greater financial
          clarity.
        </p>
      </div>

      <div className="calculator-section">
        <div className="input-group">
          <label>Which suburb are you looking forward to stay?</label>
          <div className="suburb-input-container" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Search your suburb or postcode within Victoria only"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              className="suburb-input"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-dropdown">
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    onClick={() => handleSelectSuburb(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="input-group">
          <label>How much of your savings are you planning to use for renting in the years ahead?</label>
          <div className="suburb-input-container">
            <input
              type="number"
              placeholder="Enter value between $10,000 and $310,000"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
              className="savings-input"
              min="10000"
              max="310000"
            />
          </div>
        </div>

        <div className="input-group">
          <label>What is your property type?</label>
          <div className="dropdown-container">
            <select 
              value={propertyType} 
              onChange={(e) => setPropertyType(e.target.value)}
              className="property-dropdown"
            >
              <option value="1 Bed Flat">1 Bed Flat</option>
              <option value="2 Bed Flat">2 Bed Flat</option>
              <option value="2 Bed House">2 Bed House</option>
              <option value="3 Bed Flat">3 Bed Flat</option>
              <option value="3 Bed House">3 Bed House</option>
              <option value="4 Bed House">4 Bed House</option>
            </select>
          </div>
        </div>

        <button 
          className="calculate-button" 
          onClick={calculateYears}
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'ESTIMATE YEARS'}
        </button>
      </div>

      {results && (
        <div className="results-section">
          <div className="results-summary">
            <div className="result-card">
              <h3>Median Weekly Rent</h3>
              <p className="result-value">{formatCurrency(formatWeeklyRent(results.annual_rent_start))}</p>
            </div>
            <div className="result-card">
              <h3>Avg rental inflation</h3>
              <p className="result-value">{(results.rental_inflation * 100).toFixed(1)}%</p>
            </div>
            <div className="result-card">
              <h3>Estimated years affordable</h3>
              <p className="result-value highlight">{results.can_live_years} years</p>
            </div>
          </div>

          <p className="results-explanation">
            Based on current rent and {(results.rental_inflation * 100).toFixed(1)}% average rental inflation
            rate, you can afford to live in <strong>{results.target_suburb}</strong>, in a <strong>{propertyType}</strong> for
            approximately <strong>{results.can_live_years} years</strong>.
          </p>

          <div className="recommendations">
            <h2>Recommended Similar Suburbs</h2>
            
            {hasNoValidRecommendations() ? (
              <div className="no-recommendations-message">
                <p>Your budget is insufficient to recommend alternative suburbs. Consider increasing your budget or exploring more affordable property types.</p>
              </div>
            ) : getValidRecommendations().length > 0 ? (
              <>
                <div className="chart-container">
                  <Bar data={chartData} options={chartOptions} height={350} />
                </div>
                <div className="recommendations-list">
                  {getValidRecommendations().map((rec, index) => (
                    <div className="recommendation-item" key={index}>
                      <div className="recommendation-info">
                        <h3>{rec.suburb}</h3>
                        <p>
                          <span>Weekly rent:</span> 
                          <strong>{formatCurrency(rec.median)}</strong>
                        </p>
                        <p>
                          <span>Inflation rate:</span> 
                          <strong>{(rec.rental_inflation * 100).toFixed(1)}%</strong>
                        </p>
                        <p>
                          <span>Affordable for:</span> 
                          <strong>{rec.years} years</strong>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-recommendations-message">
                <p>No suitable recommendations found based on your criteria.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculation;
