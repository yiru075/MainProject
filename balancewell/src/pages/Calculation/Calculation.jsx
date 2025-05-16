import { useState, useEffect, useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { supabase } from '../../../supabaseClient';
import './Calculation.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

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
  const [crimeData, setCrimeData] = useState(null);
  const [showCrimeInsights, setShowCrimeInsights] = useState(false);
  const [loadingCrimeData, setLoadingCrimeData] = useState(false);
  const [selectedSuburb, setSelectedSuburb] = useState(null);
  const dropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

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
          setIsLoading(true);
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
          setNoMatch(data.suggestions && data.suggestions.length === 0);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
          setNoMatch(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        setNoMatch(false);
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

  // Fetch crime data for suburbs
  const fetchCrimeData = async (suburbs) => {
    if (!suburbs || suburbs.length === 0) return;

    setLoadingCrimeData(true);

    try {
      // Try to fetch data from the API
      const response = await fetch(
        'https://xdlxegeejnkumdzxsqzs.supabase.co/functions/v1/rapid-responder',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_TOKEN}`
          },
          body: JSON.stringify({ suburbs })
        }
      );

      if (!response.ok) throw new Error('Failed to fetch crime data');

      const data = await response.json();
      if (data.success) {
        setCrimeData(data.data);
      } else {
        console.error('Error in crime data response:', data);
      }
    } catch (error) {
      console.error('Error fetching crime data:', error);

      // Provide mock data when the API call fails (e.g., due to CORS issues in development)
      // This is a temporary workaround for development purposes
      if (import.meta.env.DEV) {
        console.log('Using mock crime data due to API error');
        const mockCrimeData = {};

        // Create mock data for each suburb
        suburbs.forEach(suburbName => {
          // Generate random values between ranges for demonstration
          const crimeIndex = Math.floor(Math.random() * 10000) + 5000;

          // Determine crime intensity based on index value
          let crimeIntensity;
          if (crimeIndex < 7000) {
            crimeIntensity = 'Low';
          } else if (crimeIndex < 10000) {
            crimeIntensity = 'Moderate';
          } else {
            crimeIntensity = 'High';
          }

          mockCrimeData[suburbName] = {
            crime_index: crimeIndex,
            crime_intensity: crimeIntensity,
            lga: 'Sample LGA',
            crime_trend_2020_2024: {
              2020: null,
              2021: Math.random() * 5 - 2.5,
              2022: Math.random() * 5 - 2.5,
              2023: Math.random() * 5 - 2.5,
              2024: Math.random() * 5 - 2.5
            }
          };
        });

        setCrimeData(mockCrimeData);
      }
    } finally {
      setLoadingCrimeData(false);
    }
  };

  // Calculate sustainability years
  const calculateYears = async () => {
    if (!suburb || !savings || !propertyType) {
      alert('Please fill in all fields');
      return;
    }

    const savingsValue = parseInt(savings);
    if (savingsValue < 20000 || savingsValue > 310000) {
      alert('Please enter a budget between $20,000 and $310,000');
      return;
    }

    setLoading(true);
    setCrimeData(null);
    setShowCrimeInsights(false);

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

      // Prepare suburbs for crime data fetch - Limit to 6 suburbs total
      const allSuburbs = new Set();

      // 1. Add target suburb
      if (data.target_suburb) {
        allSuburbs.add(data.target_suburb);
      }

      // 2. Add top 5 recommendations that have years > 0
      if (data.recommendations && data.recommendations.length > 0) {
        const validRecs = data.recommendations.filter(rec => rec.years > 0);
        for (let i = 0; i < Math.min(validRecs.length, 5); i++) {
          if (validRecs[i].suburb) {
            allSuburbs.add(validRecs[i].suburb);
          }
        }
      }

      // Convert Set back to array and fetch crime data
      const suburbsArray = [...allSuburbs];
      console.log("Fetching crime data for suburbs:", suburbsArray);

      if (suburbsArray.length > 0) {
        fetchCrimeData(suburbsArray);
      }

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
        backgroundColor: 'rgba(255, 154, 0, 0.8)',
        borderColor: 'rgba(255, 154, 0, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Estimated Years of Rent Affordability in Recommended Suburbs',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        },
        color: '#FFC107',
      },
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
          color: '#FFC107',
        },
        title: {
          display: true,
          text: 'Years',
          color: '#FFC107',
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
            size: 20,
          },
          color: '#FFC107',
        }
      }
    }
  };

  // Get crime level class based on intensity
  const getCrimeLevelClass = (intensity) => {
    switch (intensity) {
      case 'Low':
        return 'crime-level-low';
      case 'Moderate':
        return 'crime-level-moderate';
      case 'High':
        return 'crime-level-high';
      default:
        return '';
    }
  };

  // Get all suburbs for crime data (target and valid recommendations)
  const getAllSuburbs = () => {
    const suburbs = new Set(); 

    // Add target suburb
    if (results?.target_suburb) {
      suburbs.add(results.target_suburb);
    }

    if (results?.recommendations) {
      const validRecs = results.recommendations.filter(rec => rec.years > 0);
      for (let i = 0; i < Math.min(validRecs.length, 5); i++) {
        if (validRecs[i].suburb) {
          suburbs.add(validRecs[i].suburb);
        }
      }
    }

    if (suburbs.size < 6 && suburb && !suburbs.has(suburb) && !isCaseInsensitiveMatch(suburb, [...suburbs])) {
      suburbs.add(suburb);
    }

    // Debug log to check what suburbs we're using
    const suburbList = [...suburbs];
    console.log("All suburbs for crime data:", suburbList);

    return suburbList;
  };

  // Helper function to check case-insensitive match
  const isCaseInsensitiveMatch = (suburb, suburbList) => {
    const lowerSuburb = suburb.toLowerCase();
    return suburbList.some(s => s.toLowerCase() === lowerSuburb);
  };

  // Generate SVG path for crime trend line
  const generateTrendPath = (trendData) => {
    if (!trendData || !trendData.crime_trend_2020_2024) return '';

    const trend = trendData.crime_trend_2020_2024;

    // Only display years 2021-2024 since 2020 is the base year
    const years = ['2021', '2022', '2023', '2024'];

    // Filter out null values and get the percentage changes
    const values = years.map(year => trend[year] !== null ? trend[year] : 0);

    // If all values are null/0, return empty path
    if (values.every(v => v === 0 || v === null)) return '';

    // Normalize values for visual representation
    const maxValue = Math.max(...values.map(v => Math.abs(v)), 5); // At least 5% for scale

    // Map values to y-positions (0.5 = middle, 0 = top, 1 = bottom)
    // Positive values go up (smaller y), negative values go down (larger y)
    const normalizedValues = values.map(v => 0.5 - (v / maxValue) * 0.4); // Use 40% of height for variation

    // Create SVG path - M=moveto, L=lineto
    const width = 100;
    const height = 50;
    const step = width / (years.length - 1);

    // Create path points
    const pathPoints = normalizedValues.map((v, i) =>
      `${i * step},${v * height}`
    );

    return `M${pathPoints.join(' L')}`;
  };

  // Get suburb crime data with case-insensitive matching
  const getSuburbCrimeData = (suburbName, crimeDataObj) => {
    if (!suburbName || !crimeDataObj) return null;

    // Direct match
    if (crimeDataObj[suburbName]) {
      return crimeDataObj[suburbName];
    }

    // Case-insensitive match
    const suburbLower = suburbName.toLowerCase();
    const keys = Object.keys(crimeDataObj);

    for (const key of keys) {
      if (key.toLowerCase() === suburbLower) {
        return crimeDataObj[key];
      }
    }

    return null;
  };

  const generateCrimeTrendChartData = (suburbName, suburbCrimeData) => {
    if (!suburbCrimeData || !suburbCrimeData.crime_trend_2020_2024) return null;

    const trend = suburbCrimeData.crime_trend_2020_2024;
    const years = ['2020', '2021', '2022', '2023', '2024'];
    const values = [];

    let baseValue = 10000; 
    values.push(baseValue);

    for (let i = 1; i < years.length; i++) {
      const year = years[i];
      const percentChange = trend[year] !== null ? trend[year] : 0;
      if (i === 1) {
        values.push(baseValue * (1 + percentChange / 100));
      } else {
        values.push(values[i - 1] * (1 + percentChange / 100));
      }
    }

    return {
      labels: years,
      datasets: [
        {
          label: 'Crime Rate',
          data: values,
          borderColor: 'rgba(255, 154, 0, 1)',
          backgroundColor: 'rgba(255, 154, 0, 0.1)',
          pointBackgroundColor: 'rgba(255, 154, 0, 1)',
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3,
          fill: false
        }
      ]
    };
  };

  // Helper function to capitalize the first letter of each word in a suburb name
  const capitalizeSuburbName = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: selectedSuburb ? `${capitalizeSuburbName(selectedSuburb)} - Crime Rate Trend (2020-2024)` : 'Crime Rate Trend (2020-2024)',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        },
        color: '#FFC107',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const value = context.raw;

            if (index > 0) {
              const prevValue = context.dataset.data[index - 1];
              const percentChange = ((value - prevValue) / prevValue * 100).toFixed(2);
              const sign = percentChange > 0 ? '+' : '';
              return [`Crime Rate: ${Math.round(value)}`, `Change: ${sign}${percentChange}%`];
            }

            return `Crime Rate: ${Math.round(value)}`;
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Crime Rate per 100,000 Population',
          font: {
            weight: 'bold'
          },
          color: '#FFC107',
        },
        ticks: {
          color: '#FFC107'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },

      },
      x: {
        title: {
          display: true,
          text: 'Year',
          font: {
            weight: 'bold'
          },
          color: '#FFC107',
        },
        ticks: {
          color: '#FFC107'
        },
        grid: {
          display: false
        }
      }
    }
  };

  const handleCrimeCardClick = (suburbName) => {
    if (selectedSuburb === suburbName) {
      setSelectedSuburb(null); 
    } else {
      setSelectedSuburb(suburbName); 
    }
  };

  return (
    <div className="calculation-container">
      <div className="hero-section">
        <h2>Project Your Rent Sustainability Over Time</h2>
        <p>
          This calculator is designed to help you understand how long your savings might cover rental expenses in a specific suburb.
        </p>
        <p>
          By entering your available budget, you'll receive an estimate of how many months or years you could afford to rent in that area based on:
        </p>
        <ul>
          <li>Current median weekly rent, and</li>
          <li>5-year average rental inflation for that suburb.</li>
        </ul>
        <p>
          You'll also receive alternative suburb suggestions where your savings may stretch further, giving you more options to consider.
        </p>
      </div>

      <div className="calculator-section">
        <div className="input-group">
          <label>Which suburb are you looking forward to stay?</label>
          <div className="suburb-input-wrapper" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Search your suburb name within Victoria only"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              className="suburb-input"
            />
            
            {isLoading && <p className="form-info">Loading...</p>}
            
            {showSuggestions && suggestions.length > 0 && (
              <ul className="search-results" role="listbox">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="search-result-item"
                    onClick={() => handleSelectSuburb(suggestion)}
                    role="option"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            
            {noMatch && !isLoading && suburb.trim() !== '' && (
              <p className="form-error">No matching suburbs found in Victoria.</p>
            )}
          </div>
        </div>

        <div className="input-group">
          <label>How much of your savings are you planning to use for renting in the years ahead?</label>
          <div className="suburb-input-container">
            <input
              type="number"
              placeholder="Enter value between $20,000 and $310,000"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
              className="savings-input"
              min="20000"
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
            Based on median weekly rent and 5 year average rental inflation rate of {(results.rental_inflation * 100).toFixed(1)}%, you can afford to live in <strong>{capitalizeSuburbName(results.target_suburb)}</strong>, in a <strong>{propertyType}</strong> for approximately <strong>{results.can_live_years} years</strong>.
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
                        <h3>{capitalizeSuburbName(rec.suburb)}</h3>
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

                {/* Safety insights toggle */}
                <div className="safety-insights-toggle">
                  <div
                    className="safety-banner"
                    onClick={() => setShowCrimeInsights(!showCrimeInsights)}
                  >
                    <div className="safety-banner-icon">⚠️</div>
                    <div className="safety-banner-text">
                      <h3>Curious about safety?</h3>
                      <div className="safety-features">
                        <div className="safety-feature">
                          <span className="check-icon">✓</span>
                          <span>Your selected suburb</span>
                        </div>
                        <div className="safety-feature">
                          <span className="check-icon">✓</span>
                          <span>Top 5 most affordable suburb we just recommended</span>
                        </div>
                      </div>
                    </div>
                    <button className="insights-button">
                      {showCrimeInsights ? 'Hide insights' : 'Show insights'}
                    </button>
                  </div>
                </div>

                {/* Crime data section */}
                {showCrimeInsights && crimeData && (
                  <div className="crime-data-container">
                    {loadingCrimeData ? (
                      <div className="loading-crime-data">Loading crime data...</div>
                    ) : (
                      <>
                        <div className="crime-data-grid">
                          {getAllSuburbs().map((suburbName, index) => {
                            // Use the case-insensitive matching function
                            const suburbCrimeData = getSuburbCrimeData(suburbName, crimeData);

                            return (
                              <div
                                className={`crime-data-card ${selectedSuburb === suburbName ? 'selected' : ''}`}
                                key={index}
                                onClick={() => handleCrimeCardClick(suburbName)}
                              >
                                <h3>{capitalizeSuburbName(suburbName)}</h3>
                                {suburbCrimeData ? (
                                  <>
                                    <p className="lga-info">
                                      {capitalizeSuburbName(suburbName)} falls under the {suburbCrimeData.lga} Local Government Area.
                                    </p>
                                    <p className="crime-rate-info">
                                      Per year, an average of {suburbCrimeData.crime_index.toLocaleString()} crime incidents per 100,000 people is recorded in this LGA. [10 Year Average: 2015 to 2024]
                                    </p>
                                    <div className="crime-data-info">
                                      <p className="crime-index">
                                        Crime Index:
                                        <span className="crime-index-value">{suburbCrimeData.crime_index} incidents / 100,000 population</span>
                                      </p>
                                      <p className="crime-level">
                                        Crime Level:
                                        <span className={`crime-level-tag ${getCrimeLevelClass(suburbCrimeData.crime_intensity)}`}>
                                          {suburbCrimeData.crime_intensity}
                                        </span>
                                      </p>
                                      <div className="view-trend-hint">
                                        <span className="info-icon">ⓘ</span>
                                        <span>Click to {selectedSuburb === suburbName ? 'hide' : 'view'} crime trend</span>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="no-crime-data">
                                    <p>No crime data available for this suburb</p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {selectedSuburb && (
                          <div className="trend-modal-overlay" onClick={() => setSelectedSuburb(null)}>
                            <div className="trend-modal" onClick={e => e.stopPropagation()}>
                              <div className="modal-header">
                                <h3>{capitalizeSuburbName(selectedSuburb)}</h3>
                                <button className="close-modal-btn" onClick={() => setSelectedSuburb(null)}>×</button>
                              </div>
                              {getSuburbCrimeData(selectedSuburb, crimeData) && (
                                <div className="crime-trend-detailed">
                                  <div className="modal-suburb-info">
                                    <p className="lga-info">
                                      {capitalizeSuburbName(selectedSuburb)} falls under the {getSuburbCrimeData(selectedSuburb, crimeData).lga} Local Government Area.
                                    </p>
                                    <p className="crime-rate-info">
                                      Per year an average of {getSuburbCrimeData(selectedSuburb, crimeData).crime_index.toLocaleString()} crime incidents per 100,000 people is recorded in this LGA. [10 Year Average: 2015 to 2024]
                                    </p>
                                  </div>
                                  <div className="line-chart-container">
                                    <Line
                                      data={generateCrimeTrendChartData(
                                        selectedSuburb,
                                        getSuburbCrimeData(selectedSuburb, crimeData)
                                      )}
                                      options={trendChartOptions}
                                      height={300}
                                    />
                                  </div>
                                  <div className="trend-explanation">
                                    <p>This chart shows the crime rate trend for {capitalizeSuburbName(selectedSuburb)} from 2020 to 2024, with percentage changes based on the previous year.</p>
                                    <p>Values are calculated based on reported crimes per 100,000 population.</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
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
