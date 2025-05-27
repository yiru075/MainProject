import React, { useState, useEffect } from "react";
import { HeartOutlined, HeartFilled, SearchOutlined } from "@ant-design/icons";
import "./advisors.css";

// Supabase token for authentication
const SUPABASE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkbHhlZ2Vlam5rdW1kenhzcXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTAyOTksImV4cCI6MjA2MDg4NjI5OX0.Pt5uEQC9e7U5mJj7TJWYFEkXjq19glVfDJsKeukSfLw';

const Advisors = () => {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteAdvisors, setFavoriteAdvisors] = useState([]);
  const [searchParams, setSearchParams] = useState({
    postcode: "3000", // Set default value to "3000"
    roleStatus: "All", // Changed from "Current" to "All" to show all by default
    page: 1,
    pageSize: 9  // Changed to 9 items per page to fit 3 column layout
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 9,  // Changed to 9 items per page
    resultsReturned: 0
  });

  // Load saved favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteAdvisors');
    if (savedFavorites) {
      setFavoriteAdvisors(JSON.parse(savedFavorites));
    }
  }, []);

  // Fetch advisors from API
  const fetchAdvisors = async (params) => {
    setLoading(true);
    try {
      console.log("Request parameters:", params); // Debug request parameters

      const response = await fetch(
        'https://xdlxegeejnkumdzxsqzs.supabase.co/functions/v1/advisors',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_TOKEN}`
          },
          body: JSON.stringify({
            postcode: params.postcode || "3000",
            roleStatus: params.roleStatus || "Current",
            page: params.page || 1,
            pageSize: params.pageSize || 9  // Changed to 9 items per page
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Response Error:", response.status, errorText);
        throw new Error(`Failed to fetch advisors: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data); // Debug response data

      if (data.success) {
        setAdvisors(data.data);
        setPagination(data.pagination);
      } else {
        console.error('Error in advisor data response:', data);
      }
    } catch (error) {
      console.error('Error fetching advisors:', error);
      // Mock data for development if API fails
      setAdvisors([
        {
          advisor_name: "Jane Nguyen",
          role: "Financial Adviser",
          role_status: "Current",
          first_advisory_year: "2005",
          registration_status: "Registered",
          license_holder_name: "ABC Financial Services",
          license_number: "123456",
          address_area: "Springvale",
          address_state: "VIC",
          address_postcode: "3171",
          can_advise_on_superannuation: "Yes"
        },
        {
          advisor_name: "David Gasputa",
          role: "Financial Adviser",
          role_status: "Current",
          first_advisory_year: "2000",
          registration_status: "Registered",
          license_holder_name: "XYZ Wealth Management",
          license_number: "123456",
          address_area: "Carnegie",
          address_state: "VIC",
          address_postcode: "3163",
          can_advise_on_superannuation: "Yes"
        },
        {
          advisor_name: "Michael Denis Williams",
          role: "Financial Adviser",
          role_status: "Current",
          first_advisory_year: "2000",
          registration_status: "Registered",
          license_holder_name: "SENTRY ADVICE PTY LTD",
          license_number: "227748",
          address_area: "Melbourne",
          address_state: "VIC",
          address_postcode: "3000",
          can_advise_on_superannuation: "No information"
        }
      ]);
      setPagination({
        currentPage: 1,
        pageSize: 9,  // Changed to 9 items per page
        resultsReturned: 3
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchAdvisors(searchParams);
  }, []);

  // Handle suburb/location input change
  const handleLocationChange = (e) => {
    setSearchParams({
      ...searchParams,
      postcode: e.target.value,
      page: 1 // Reset to first page on new search
    });
  };

  // Handle role status change
  const handleRoleStatusChange = (e) => {
    const newStatus = e.target.value;
    
    // Update the state
    const updatedParams = {
      ...searchParams,
      roleStatus: newStatus,
      page: 1 // Reset to first page on filter change
    };
    
    setSearchParams(updatedParams);
    
    // Immediately fetch advisors with new filter
    fetchAdvisors(updatedParams);
  };

  // Handle search button click
  const handleSearch = () => {
    fetchAdvisors({
      ...searchParams,
      page: 1 // Reset to first page on new search
    });
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    const updatedParams = {
      ...searchParams,
      page: newPage
    };
    setSearchParams(updatedParams);
    fetchAdvisors(updatedParams);
  };

  // Toggle favorite status for an advisor
  const toggleFavorite = (advisor) => {
    const advisorKey = `${advisor.advisor_name}-${advisor.license_number}`;

    if (favoriteAdvisors.includes(advisorKey)) {
      const newFavorites = favoriteAdvisors.filter(key => key !== advisorKey);
      setFavoriteAdvisors(newFavorites);
      localStorage.setItem('favoriteAdvisors', JSON.stringify(newFavorites));
    } else {
      const newFavorites = [...favoriteAdvisors, advisorKey];
      setFavoriteAdvisors(newFavorites);
      localStorage.setItem('favoriteAdvisors', JSON.stringify(newFavorites));
    }
  };

  // Check if an advisor is in favorites
  const isFavorite = (advisor) => {
    const advisorKey = `${advisor.advisor_name}-${advisor.license_number}`;
    return favoriteAdvisors.includes(advisorKey);
  };

  // Alphabetical sorting option
  const sortByAlphabetical = () => {
    const sortedAdvisors = [...advisors].sort((a, b) =>
      a.advisor_name.localeCompare(b.advisor_name)
    );
    setAdvisors(sortedAdvisors);
  };

  // Helper function to display field value or "No information" if empty
  const displayValue = (value) => {
    return value ? value : "No information";
  };

  // Helper function to render superannuation advice value with correct class
  const renderSuperannuationValue = (value) => {
    if (!value) return <span className="detail-value">No information</span>;

    if (value === "Yes") {
      return <span className="detail-value yes-value">Yes</span>;
    }

    return <span className="detail-value">{value}</span>;
  };

  return (
    <div className="advisors-container">
      <div className="advisors-hero">
        <h2>Need Guidance with Your Finances?</h2>
        <p className="advisors-intro">
        Check if a financial advisor in your area is currently registered and active before making decisions
        </p>
      </div>

      <div className="advisors-search-section">
        <div className="input-group">
          <label>Which postcode are you looking for advisors in?</label>
          <div className="input-container">

            <input
              type="text"
              placeholder="Enter 4-digit postcode(e.g., 3000)"
              value={searchParams.postcode}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,4}$/.test(value)) {
                  setSearchParams({
                    ...searchParams,
                    postcode: value,
                    page: 1,
                  });
                }
              }}
              className="search-input"
              maxLength={4}
              inputMode="numeric"
              pattern="\d{4}"
            />

          </div>
        </div>

        <div className="input-group">
          <label>Sort options</label>
          <button onClick={sortByAlphabetical} className="sort-button">
            Sort by Alphabetical
          </button>
        </div>

        <button className="search-button" onClick={handleSearch}>
          <SearchOutlined style={{ marginRight: "8px" }} /> SEARCH ADVISORS
        </button>
      </div>

      <div className="advisors-results">
        {loading ? (
          <div className="loading-container">
            <p>Loading advisors...</p>
          </div>
        ) : advisors.length === 0 ? (
          <div className="no-results">
            <p>No advisors found. Please try different search criteria.</p>
          </div>
        ) : (
          <>
            <div className="results-header">
              <div className="filter-container">
                <label className="filter-label">Filter by status:</label>
                <select
                  value={searchParams.roleStatus}
                  onChange={handleRoleStatusChange}
                  className="filter-select"
                >
                  <option value="All">All</option>
                  <option value="Current">Current</option>
                  <option value="Ceased">Ceased</option>
                </select>
              </div>
              <div className="results-count">
                Showing {advisors.length} advisor{advisors.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="advisors-list">
              {advisors.map((advisor, index) => (
                <div className="advisor-card" key={index}>
                  <div className="advisor-header">
                    <h3 className="advisor-name">{displayValue(advisor.advisor_name)}</h3>
                    <button
                      className="favorite-button"
                      onClick={() => toggleFavorite(advisor)}
                      aria-label={isFavorite(advisor) ? "Remove from favorites" : "Add to favorites"}
                    >
                      {isFavorite(advisor) ? <HeartFilled className="favorite-icon active" /> : <HeartOutlined className="favorite-icon" />}
                    </button>
                  </div>

                  <div className="advisor-details">
                    <div className="detail-group">
                      <span className="detail-label">Role:</span>
                      <span className="detail-value">{displayValue(advisor.role)}</span>
                    </div>

                    <div className="detail-group">
                      <span className="detail-label">Role Status:</span>
                      <span className="detail-value">{displayValue(advisor.role_status)}</span>
                    </div>

                    <div className="detail-group">
                      <span className="detail-label">First Advice Year:</span>
                      <span className="detail-value">{displayValue(advisor.first_advisory_year)}</span>
                    </div>

                    <div className="detail-group">
                      <span className="detail-label">Registration Status:</span>
                      <span className="detail-value">{displayValue(advisor.registration_status)}</span>
                    </div>

                    <div className="detail-group">
                      <span className="detail-label">License Holder Name:</span>
                      <span className="detail-value">{displayValue(advisor.license_holder_name)}</span>
                    </div>

                    <div className="detail-group">
                      <span className="detail-label">License Number:</span>
                      <span className="detail-value">{displayValue(advisor.license_number)}</span>
                    </div>

                    <div className="detail-group">
                      <span className="detail-label">Address - Locality:</span>
                      <span className="detail-value">{displayValue(advisor.address_area)}</span>
                    </div>

                    <div className="detail-group">
                      <span className="detail-label">Address - Postcode:</span>
                      <span className="detail-value">{displayValue(advisor.address_postcode)}</span>
                    </div>

                    <div className="detail-group">
                      <span className="detail-label">Can Advise on Superannuation:</span>
                      {renderSuperannuationValue(advisor.can_advise_super)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pagination.resultsReturned > 0 && (
              <div className="pagination-controls">
                <button
                  className="pagination-button"
                  disabled={pagination.currentPage === 1}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                >
                  Previous
                </button>
                <span className="page-indicator">
                  Page {pagination.currentPage}
                </span>
                <button
                  className="pagination-button"
                  disabled={pagination.resultsReturned < pagination.pageSize}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Advisors;
