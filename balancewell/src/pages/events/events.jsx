// import React, { useState, useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import './events.css';

// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN_ONE;

// const Events = () => {
//   const selectedRef = useRef(null);
//   const [suburb, setSuburb] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [noMatch, setNoMatch] = useState(false);
//   const [isAutoLocated, setIsAutoLocated] = useState(false); 

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       const trimmed = suburb.trim();

//       if (trimmed === '') {
//         setSearchResults([]);
//         setNoMatch(false);
//         return;
//       }

//       handleSearch(trimmed);
//     }, 300);

//     return () => clearTimeout(delayDebounceFn);
//   }, [suburb]);

//   const handleSearch = async (query) => {
//     setIsLoading(true);
//     try {
//       const baseUrl = import.meta.env.VITE_WEBSITE_URL;
//       const response = await fetch(`${baseUrl}/api/suburb_search?q=${encodeURIComponent(query)}`);
//       if (!response.ok) throw new Error('Search failed');
//       const data = await response.json();
//       const results = data.results || [];

//       setSearchResults(results);
//       setNoMatch(results.length === 0);
//     } catch (err) {
//       console.error('Search error:', err);
//       setSearchResults([]);
//       setNoMatch(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUseLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           const coords = [longitude, latitude];

//           const baseUrl = import.meta.env.VITE_WEBSITE_URL;
//           const response = await fetch(`${baseUrl}/api/geocode?coords=${longitude},${latitude}`);
//           const data = await response.json();
//           if (data.features && data.features.length > 0) {
//             const name = data.features[0].place_name;
//             const context = data.features[0].context || [];

//             const isVictoria = context.some(
//               (c) =>
//                 c.id.startsWith('region') &&
//                 (c.text === 'Victoria' || c.short_code === 'AU-VIC')
//             );

//             if (isVictoria) {
//               selectedRef.current = { suburb: name, coords };
//               setSuburb(name); 
//               setIsAutoLocated(true); 
//               console.log('Located suburb:', name);
//             } else {
//               alert('Your location is outside Victoria.');
//             }
//           } else {
//             alert('Unable to retrieve suburb name from your location.');
//           }
//         },
//         (error) => {
//           console.error('Location error:', error);
//           alert('Failed to retrieve your location. Please select a suburb manually.');
//         }
//       );
//     } else {
//       alert('Geolocation is not supported by your browser.');
//     }
//   };

//   const handleSearchClick = () => {
//     if (isAutoLocated && selectedRef.current) {
//       console.log('Selected suburb:', selectedRef.current.suburb);
//     } else if (suburb.trim() !== '') {
//       console.log('Selected suburb:', suburb);
//     } else {
//       alert('Please enter or select a suburb.');
//     }
//   };

//   return (
//     <div className="event-search-wrapper">
//       <div className="event-header">
//         <h2 className="event-title">Explore Local Health & Wellness Events</h2>
//         <p className="event-subtitle">
//           Find free or low-cost health checkups, workshops, and wellness activities near you.
//         </p>
//       </div>

//       <div className="event-search-box">
//         <div className="geocoder-container">
//           <div className="suburb-input-row">
//             <input
//               type="text"
//               value={suburb}
//               onChange={(e) => {
//                 setSuburb(e.target.value);
//                 setIsAutoLocated(false); 
//               }}
//               className="form-input"
//               placeholder="Enter suburb name"
//             />
//             <button className="event-location-btn" onClick={handleUseLocation}>
//               Use my location
//             </button>
//           </div>

//           {isLoading && <p className="form-info">Loading...</p>}

//           {searchResults.length > 0 && suburb.trim() !== '' && (
//             <ul className="search-results" role="listbox">
//               {searchResults.map((result, index) => (
//                 <li
//                   key={index}
//                   className="search-result-item"
//                   onClick={() => {
//                     setSuburb(result.name);
//                     setSearchResults([]);
//                     setNoMatch(false);
//                     setIsAutoLocated(false); 
//                   }}
//                   role="option"
//                 >
//                   {result.name}
//                 </li>
//               ))}
//             </ul>
//           )}

//           {noMatch && !isLoading && suburb.trim() !== '' && (
//             <p className="form-error">No matching suburbs found in Victoria.</p>
//           )}
//         </div>

//         <button className="event-search-btn" onClick={handleSearchClick}>
//           Find events near me
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Events;



import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './events.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN_ONE;

const Events = () => {
  const selectedRef = useRef(null);
  const [suburb, setSuburb] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [isAutoLocated, setIsAutoLocated] = useState(false);
  const [category, setCategory] = useState('health');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const trimmed = suburb.trim();
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

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const coords = [longitude, latitude];
          const baseUrl = import.meta.env.VITE_WEBSITE_URL;
          const response = await fetch(`${baseUrl}/api/geocode?coords=${longitude},${latitude}`);
          const data = await response.json();
          if (data.features && data.features.length > 0) {
            const name = data.features[0].place_name;
            const context = data.features[0].context || [];
            const isVictoria = context.some(
              (c) => c.id.startsWith('region') &&
                     (c.text === 'Victoria' || c.short_code === 'AU-VIC')
            );
            if (isVictoria) {
              selectedRef.current = { suburb: name, coords };
              setSuburb(name);
              setIsAutoLocated(true);
            } else {
              alert('Your location is outside Victoria.');
            }
          } else {
            alert('Unable to retrieve suburb name from your location.');
          }
        },
        (error) => {
          console.error('Location error:', error);
          alert('Failed to retrieve your location. Please select a suburb manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleSearchClick = async () => {
    let lat, lng;
    if (selectedRef.current?.coords) {
      [lng, lat] = selectedRef.current.coords;
    } else {
      alert('Please use location or choose a suburb.');
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_WEBSITE_URL;
      const res = await fetch(`${baseUrl}/api/events?lat=${lat}&lng=${lng}&category=${category}`);
      const data = await res.json();
      setEvents(data.events || []);
    } catch (err) {
      console.error('Event fetching failed:', err);
      alert('Failed to fetch events.');
    }
  };

  return (
    <div className="event-search-wrapper">
      <div className="event-header">
        <h2 className="event-title">Explore Local Health & Wellness Events</h2>
        <p className="event-subtitle">
          Find free or low-cost health checkups, workshops, and wellness activities near you.
        </p>
      </div>

      <div className="event-search-box">
        <div className="geocoder-container">
          <div className="suburb-input-row">
            <input
              type="text"
              value={suburb}
              onChange={(e) => {
                setSuburb(e.target.value);
                setIsAutoLocated(false);
              }}
              className="form-input"
              placeholder="Enter suburb name"
            />
            <button className="event-location-btn" onClick={handleUseLocation}>
              Use my location
            </button>
          </div>

          {isLoading && <p className="form-info">Loading...</p>}

          {searchResults.length > 0 && suburb.trim() !== '' && (
            <ul className="search-results" role="listbox">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="search-result-item"
                  onClick={() => {
                    setSuburb(result.name);
                    setSearchResults([]);
                    setNoMatch(false);
                    setIsAutoLocated(false);
                  }}
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

        <button className="event-search-btn" onClick={handleSearchClick}>
          Find events near me
        </button>
      </div>

      <div className="event-tabs">
        <button
          className={category === 'health' ? 'tab active' : 'tab'}
          onClick={() => setCategory('health')}
        >
          Health Events
        </button>
        <button
          className={category === 'social' ? 'tab active' : 'tab'}
          onClick={() => setCategory('social')}
        >
          Social / Wellbeing Events
        </button>
      </div>

      <div className="event-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
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
    </div>
  );
};

export default Events;
