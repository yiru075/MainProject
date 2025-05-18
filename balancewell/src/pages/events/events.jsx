import React, { useState, useEffect, useRef } from 'react';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './events.css';


const Events = () => {
  const selectedRef = useRef(null);
  const [suburb, setSuburb] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [isAutoLocated, setIsAutoLocated] = useState(false);
  const [category, setCategory] = useState('health');
  const [events, setEvents] = useState([]);
  const [skipNextSearch, setSkipNextSearch] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [invalidChar, setInvalidChar] = useState(false);
  const [invalidLength, setInvalidLength] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);



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
      // handleSearch(trimmed);
      handleAutocomplete(trimmed);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [suburb]);

  const handleAutocomplete = async (query) => {
    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_WEBSITE_URL;
      const response = await fetch(`${baseUrl}/api/suburb_search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      const results = data.results || [];
      setSearchResults(results);
      setNoMatch(results.length === 0);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
      setNoMatch(true);
    } finally {
      setIsLoading(false);
    }
  };


  const handleInputChange = (e) => {
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
    setIsAutoLocated(false);
  };

  const handleItemClick = (name) => {
    setSuburb(name);
    setSearchResults([]);
    setNoMatch(false);
    setSkipNextSearch?.(true);
    setIsAutoLocated?.(false);
    onSuburbSelect?.(name);
  };


  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const coords = [longitude, latitude];
        const baseUrl = import.meta.env.VITE_WEBSITE_URL;
        const timestamp = Date.now();
        const response = await fetch(`${baseUrl}/api/geocode?coords=${longitude},${latitude}&t=${timestamp}`);
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const name = data.features[0].place_name;
          const context = data.features[0].context || [];
          const isVictoria = context.some(
            (c) => c.id.startsWith('region') && (c.text === 'Victoria' || c.short_code === 'AU-VIC')
          );
          if (isVictoria) {
            selectedRef.current = { suburb: name, coords };
            setSuburb(name);
            setIsAutoLocated(true);
            await handleSearchClick(category);
          } else {
            alert('Your location is outside Victoria.');
          }
        } else {
          alert('Unable to retrieve suburb name from your location.');
        }
      }, (error) => {
        console.error('Location error:', error);
        alert('Failed to retrieve your location. Please select a suburb manually.');
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };


  const handleCategoryChange = async (newCategory) => {
    setCategory(newCategory);
    setIsFallback(false);
    setEvents([]);
    setSelectedEvent(null);
    setIsLoading(true);
    if (selectedRef.current?.coords) {
      await handleSearchClick(newCategory);
    } else {
      setIsLoading(false);
    }
  };

  const handleSearchClick = async (customCategory = category) => {
    let lat, lng;
    setIsFallback(false);
    setEvents([]);
    setIsLoading(true);

    if (!selectedRef.current?.coords && suburb.trim() !== '') {
      try {
        const baseUrl = import.meta.env.VITE_WEBSITE_URL;
        const response = await fetch(`${baseUrl}/api/geocode?q=${encodeURIComponent(suburb)}&t=${Date.now()}`);
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const coords = data.features[0].center;
          const context = data.features[0].context || [];
          const isVictoria = context.some(
            (c) => c.id.startsWith('region') && (c.text === 'Victoria' || c.short_code === 'AU-VIC')
          );
          if (!isVictoria) {
            alert('This suburb is not in Victoria.');
            setIsLoading(false);
            return;
          }
          selectedRef.current = { suburb, coords };
          [lng, lat] = coords;
        } else {
          alert('Could not resolve location from suburb name.');
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error('Geocode fetch error:', err);
        alert('Failed to resolve location.');
        setIsLoading(false);
        return;
      }
    } else if (selectedRef.current?.coords) {
      [lng, lat] = selectedRef.current.coords;
    } else {
      alert('Please use location or choose a suburb.');
      setIsLoading(false);
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_WEBSITE_URL;
      const res = await fetch(`${baseUrl}/api/events?lat=${lat}&lng=${lng}&category=${customCategory}`);
      const data = await res.json();
      setEvents(data.events || []);
      setIsFallback(data.isFallback || false);
    } catch (err) {
      console.error('Event fetching failed:', err);
      alert('Failed to fetch events.');
    } finally {
      setIsLoading(false);
    }
    setHasSearched(true);

  };

  const handleSuburbSelect = async (resultName) => {
    setSuburb(resultName);
    setSearchResults([]);
    setNoMatch(false);
    setIsAutoLocated(false);
    setSkipNextSearch(true);
    try {
      const baseUrl = import.meta.env.VITE_WEBSITE_URL;
      const timestamp = Date.now();
      const response = await fetch(`${baseUrl}/api/geocode?q=${encodeURIComponent(resultName)}&t=${timestamp}`);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const coords = feature.center;
        const context = feature.context || [];
        const isVictoria = context.some(
          (c) => c.id.startsWith('region') && (c.text === 'Victoria' || c.short_code === 'AU-VIC')
        );
        if (isVictoria) {
          selectedRef.current = { suburb: resultName, coords };
        } else {
          alert('This suburb is not in Victoria.');
        }
      } else {
        alert('Could not find coordinates for the selected suburb.');
      }
    } catch (error) {
      console.error('Failed to fetch coordinates:', error);
      alert('Failed to retrieve location data.');
    }
  };

  return (
    <div className="event-search-wrapper">
      <div className="event-header">
        <h2 className="event-title">Explore Local Health & Wellness Events</h2>
        <p className="event-subtitle">
          Find free health checkups, workshops, and wellness activities near you.
        </p>
      </div>

      <div className="event-search-box">
        <div className="geocoder-container">
          <div className="suburb-input-row">
            <input
              type="text"
              value={suburb}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter suburb name"
            />

            <button className="event-location-btn" onClick={handleUseLocation}>
              Use my location
            </button>
          </div>
          {invalidChar && (
            <p className="form-error">Only English letters, spaces and commas are allowed.</p>
          )}
          {invalidLength && (
            <p className="form-error">Suburb name must be between 2 and 80 characters.</p>
          )}

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
        <button className="event-search-btn" onClick={() => handleSearchClick()}>
          Find events near me
        </button>
      </div>

      <div className="event-tabs">
        <button
          className={category === 'health' ? 'tab active' : 'tab'}
          onClick={() => handleCategoryChange('health')}
        >
          Health Events
        </button>
        <button
          className={category === 'social' ? 'tab active' : 'tab'}
          onClick={() => handleCategoryChange('social')}
        >
          Social / Wellbeing Events
        </button>
      </div>

      {selectedEvent ? (
        <div className="event-detail">
          <button className="back-btn" onClick={() => setSelectedEvent(null)}>← Back</button>
          <h2>{selectedEvent.name}</h2>
          <p className="event-time">
            {new Date(selectedEvent.datetime_start).toLocaleString('en-AU', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit'
            })} – {new Date(selectedEvent.datetime_end).toLocaleTimeString('en-AU', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>


          {selectedEvent.images?.images?.[0]?.transforms?.transforms?.find(t => t.transformation_id === 7) && (
            <img
              src={selectedEvent.images.images[0].transforms.transforms.find(t => t.transformation_id === 7).url}
              alt={selectedEvent.name}
              className="event-detail-img"
            />
          )}

          <h3>Location</h3>
          <p>{selectedEvent.location_summary}<br />{selectedEvent.address}</p>

          <h3>Description</h3>
          <p dangerouslySetInnerHTML={{ __html: selectedEvent.description }} />

          <h3>Category</h3>
          <p>{selectedEvent.category?.name}</p>

          <h3>Cost</h3>
          <p>{selectedEvent.is_free ? 'Free' : 'Check website'}</p>

          <a href={selectedEvent.url} target="_blank" rel="noopener noreferrer">
            <button className="register-btn">Register Now</button>
          </a>
        </div>
      ) : (
        <div className="event-list">
          {isLoading && (
            <p className="form-info" style={{ textAlign: 'center' }}>
              Loading events...
            </p>
          )}

          {!isLoading && isFallback && (
            <p className="form-info" style={{ textAlign: 'center' }}>
              No nearby events found. Showing you events across Victoria.
            </p>
          )}


          {!isLoading && hasSearched && events.length === 0 && !isFallback && (
            <p className="form-error" style={{ textAlign: 'center' }}>
              No events found for this area and category.
            </p>
          )}


          {!isLoading && events.map((event) => (
            <div key={event.id} className="event-card" onClick={() => setSelectedEvent(event)}>
              <div className="event-date">
                <div className="event-day">
                  {new Date(event.datetime_start).toLocaleDateString('en-AU', { weekday: 'short' }).toUpperCase()}
                </div>
                <div className="event-date-num">{new Date(event.datetime_start).getDate()}</div>
                <div className="event-month">
                  {new Date(event.datetime_start).toLocaleString('default', { month: 'short' }).toUpperCase()}
                </div>
              </div>
              <div className="event-info">
                <h3 className="event-title">{event.name}</h3>
                <p className="event-location">{event.venue?.summary || event.location_summary}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
