import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import { useNavigate } from 'react-router-dom';
import './housing.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN_ONE;

const houseTypes = [
  '1 Bed Flat',
  '2 Bed Flat',
  '2 Bed House',
  '3 Bed House',
  '3 Bed Flat',
  '4 Bed House',
];

const getCoordsFromSuburb = async (suburb) => {
  try {
    const baseUrl = import.meta.env.VITE_WEBSITE_URL;
    const response = await fetch(`${baseUrl}/api/geocode?q=${encodeURIComponent(suburb)}`);
    if (!response.ok) {
      throw new Error('Failed to retrieve location');
    }
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      return data.features[0].center;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch coordinates:', error);
    return null;
  }
};

const Housing = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const popupRef = useRef(new mapboxgl.Popup({ closeButton: false, closeOnClick: false }));

  const [selectedType, setSelectedType] = useState('1 Bed Flat');
  const [loading, setLoading] = useState(true);
  const [hasSuburbData, setHasSuburbData] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [maxDistance, setMaxDistance] = useState(10);
  const [showControlPanel, setShowControlPanel] = useState(false);

  const geojsonRef = useRef(null);
  const userCoordsRef = useRef(null);
  const sustainabilityDataRef = useRef(null);
  const navigate = useNavigate();
  const [showMissingDataModal, setShowMissingDataModal] = useState(false);


  const updateInteraction = (map, type) => {
    if (!map || !map.getLayer('rent-heatmap')) return;

    map.setPaintProperty('rent-heatmap', 'fill-color', [
      'case',
      ['boolean', ['!=', ['get', type], null], false],
      [
        'interpolate',
        ['linear'],
        ['get', type],
        300, '#ffffb2',
        500, '#fecc5c',
        700, '#fd8d3c',
        1000, '#f03b20',
        1300, '#bd0026',
      ],
      '#eeeeee'
    ]);

    map.off('mousemove', 'rent-heatmap', map._hoverMove);
    map.off('mouseleave', 'rent-heatmap', map._hoverLeave);

    const handleMouseMove = (e) => {
      const feature = e.features?.[0];
      if (feature) {
        const suburb = feature.properties.vic_loca_2 || 'Unknown';
        const rent = feature.properties[type];
        const rentDisplay = rent ? `$${rent}` : 'No Data';

        popupRef.current
          .setLngLat(e.lngLat)
          .setHTML(`<div style="color: black;"><strong>${suburb}</strong><br/>${type}: ${rentDisplay}</div>`)
          .addTo(map);

        map.getCanvas().style.cursor = 'pointer';
      }
    };

    const handleMouseLeave = () => {
      popupRef.current.remove();
      map.getCanvas().style.cursor = '';
    };

    map.on('mousemove', 'rent-heatmap', handleMouseMove);
    map.on('mouseleave', 'rent-heatmap', handleMouseLeave);

    map._hoverMove = handleMouseMove;
    map._hoverLeave = handleMouseLeave;
  };

  const generateRecommendations = (geojson, coords, income, suburbName, currentRent) => {
    const userPoint = turf.point(coords);
    const recommendationsRaw = [];

    for (const feature of geojson.features) {
      const rent = feature.properties[selectedType];
      const suburb = feature.properties.vic_loca_2;

      if (!rent || rent >= income * 0.3 || suburb === suburbName) continue;

      const centroid = turf.centroid(feature);
      const distance = turf.distance(userPoint, centroid, { units: 'kilometers' });

      if (distance <= maxDistance) {
        const saved = currentRent - rent;
        recommendationsRaw.push({ suburb, rent, distance, saved });
      }
    }

    recommendationsRaw.sort((a, b) => a.distance - b.distance);
    const topRecommendations = recommendationsRaw.slice(0, 5);
    setRecommendations(topRecommendations);

    const highlightedFeatures = geojson.features.filter((feature) =>
      topRecommendations.some(r => r.suburb === feature.properties.vic_loca_2)
    );

    const map = mapRef.current;
    if (map.getSource('recommended-outline-source')) {
      map.getSource('recommended-outline-source').setData({
        type: 'FeatureCollection',
        features: highlightedFeatures
      });
    } else {
      map.addSource('recommended-outline-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: highlightedFeatures
        }
      });

      map.addLayer({
        id: 'recommended-outline',
        type: 'line',
        source: 'recommended-outline-source',
        paint: {
          'line-color': '#0066ff',
          'line-width': 2,
          'line-opacity': 0.8,
        }
      }), undefined;

      map.addLayer({
        id: 'recommended-fill',
        type: 'fill',
        source: 'recommended-outline-source',
        paint: {
          'fill-color': '#66ccff',
          'fill-opacity': 0.2,
        }
      });
    }
  };

  useEffect(() => {
    const sustainabilityRaw = localStorage.getItem('sustainabilityData');
    if (!sustainabilityRaw) {
      setShowMissingDataModal(true);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);



  useEffect(() => {
    const init = async () => {

      let userCoords = [144.9631, -37.8136];

      const sustainabilityRaw = localStorage.getItem('sustainabilityData');
      if (sustainabilityRaw) {
        const parsed = JSON.parse(sustainabilityRaw);
        sustainabilityDataRef.current = parsed;
        const coords = await getCoordsFromSuburb(parsed.suburb);
        if (coords) userCoords = coords;
        userCoordsRef.current = coords;
      }

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: userCoords,
        zoom: 9,
      });

      mapRef.current = map;

      map.on('load', async () => {
        try {
          const response = await fetch('/enhanced_rental_by_sa2.geojson');
          if (!response.ok) {
            throw new Error('Failed to load geojson data');
          }
          const geojson = await response.json();
          geojsonRef.current = geojson;

          if (!map.getSource('sa2-rent')) {
            map.addSource('sa2-rent', {
              type: 'geojson',
              data: geojson,
            });
          }

          if (!map.getLayer('rent-heatmap')) {
            map.addLayer({
              id: 'rent-heatmap',
              type: 'fill',
              source: 'sa2-rent',
              paint: {
                'fill-color': '#eeeeee',
                'fill-opacity': 0.8,
                'fill-outline-color': '#cccccc'
              }
            });
          }

          updateInteraction(map, selectedType);

          if (sustainabilityRaw && sustainabilityDataRef.current && userCoordsRef.current) {
            setHasSuburbData(true);
            const { suburb, income, rentRatio, rent } = sustainabilityDataRef.current;

            const markerElement = document.createElement('div');
            markerElement.innerText = '🔵';
            markerElement.style.fontSize = '15px';
            markerElement.style.lineHeight = '1';

            new mapboxgl.Marker({ element: markerElement })
              .setLngLat(userCoordsRef.current)
              .setPopup(new mapboxgl.Popup().setText(`Your suburb: ${suburb}`))
              .addTo(map);

            if (rentRatio > 0) {
              setShowControlPanel(true);
              if (rentRatio > 35) {
                generateRecommendations(geojson, userCoordsRef.current, income, suburb, rent);
              }
            }
          }
        } catch (err) {
          console.error('Failed to load map data:', err);
          alert('Failed to load map data. Please try again later.');
        } finally {
          setLoading(false);
        }
      });
    };

    init();

    return () => mapRef.current && mapRef.current.remove();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    updateInteraction(map, selectedType);

    if (
      hasSuburbData &&
      geojsonRef.current &&
      userCoordsRef.current &&
      sustainabilityDataRef.current?.income &&
      sustainabilityDataRef.current?.suburb &&
      showControlPanel &&
      sustainabilityDataRef.current.rentRatio > 35
    ) {
      generateRecommendations(
        geojsonRef.current,
        userCoordsRef.current,
        sustainabilityDataRef.current.income,
        sustainabilityDataRef.current.suburb,
        sustainabilityDataRef.current.rent
      );
    }
  }, [selectedType, maxDistance]);

  const controlPanel = (
    <div className="control-card">
      <div className="recommendation-box">
        <h4>Recommended Suburbs (within {maxDistance}km)</h4>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="type">Choose House Type:</label>
          <select
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {houseTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {sustainabilityDataRef.current?.rentRatio > 35 && (
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="range">Recommendation Radius: {maxDistance} km</label>
            <input
              type="range"
              id="range"
              min="0"
              max="20"
              step="1"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        )}

        {recommendations.length === 0 ? (
          sustainabilityDataRef.current?.rentRatio <= 35 && sustainabilityDataRef.current?.rentRatio > 0 ? (
            <div>The rent-to-income ratio is good. No recommendations needed at the moment.</div>
          ) : (
            <div>No suitable suburbs within the selected range.</div>
          )
        ) : (
          <table className="recommendation-table">
            <thead>
              <tr>
                <th>Suburb</th>
                <th>Rent ($/week)</th>
                <th>Distance (km)</th>
                <th>Save ($/week)</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.suburb}</td>
                  <td>${r.rent}</td>
                  <td>{r.distance.toFixed(1)}</td>
                  <td style={{ color: r.saved > 0 ? 'green' : 'inherit' }}>
                    {r.saved > 0 ? `$${r.saved.toFixed(0)}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="housing-intro">
        <h2>Find Affordable Rental Options Around You</h2>
        <p>Are you spending too much on rent?<br />
          This page helps you visualize rental prices across suburbs and find better, more affordable housing options within your preferred distance.</p>
      </div>

      {showMissingDataModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Missing Rent Information</h3>
            <p>To get personalized recommendations, please complete the Rent Sustainability Check first.</p>
            <div className="modal-buttons">
              <button className="modal-btn" onClick={() => navigate('/sustainability')}>OK</button>
              <button className="modal-btn cancel" onClick={() => setShowMissingDataModal(false)}>Skip</button>
            </div>
          </div>
        </div>
      )}


      <div className="housing-container">
        {loading && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="spinner" />
              <div className="loading-label">Loading Map Data</div>
            </div>
          </div>
        )}

        <div className={`map-card ${hasSuburbData ? 'map-card-narrow' : ''}`}>
          <div className="legend-box">
            <div className="legend-title">Median House Rent</div>
            <div className="legend-bar" />
            <div className="legend-scale">
              <span>$300</span>
              <span>$1300+</span>
            </div>
            {hasSuburbData && <div className="legend-current-suburb">🔵 Current Living Suburb</div>}
          </div>

          <div ref={mapContainer} className="map-container" />

          {!showControlPanel && (
            <div className="floating-dropdown">
              <label htmlFor="type">Choose House Type:</label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {houseTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {showControlPanel && controlPanel}


      </div>
      <div className="map-navigation">
        <p className="map-navigation-description">
          Want to review your rent situation or plan ahead?
        </p>
        <div className="map-navigation-buttons">
          <button className="continue-btn" onClick={() => { navigate('/sustainability'); }}>
            Re-check Rent Sustainability
          </button>
          <button className="continue-btn" onClick={() => {
            navigate('/calculation');
            window.scrollTo(0, 0);
          }}>
            Go to Retirement Rent Estimator
          </button>
        </div>
      </div>
    </div>
  );
};

export default Housing;
