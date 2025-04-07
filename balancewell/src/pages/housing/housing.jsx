import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Housing.css';
import * as turf from '@turf/turf';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const houseTypes = [
  '1 Bed Flat',
  '2 Bed Flat',
  '2 Bed House',
  '3 Bed House',
  '3 Bed Flat',
  '4 Bed House',
];

const Housing = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const popupRef = useRef(new mapboxgl.Popup({ closeButton: false, closeOnClick: false }));
  const [selectedType, setSelectedType] = useState('1 Bed Flat');
  const [geojsonData, setGeojsonData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [radius, setRadius] = useState(10);
  const [hasValidUserData, setHasValidUserData] = useState(false);

  const updateInteraction = (map, type) => {
    if (!map || !map.getLayer('rent-heatmap')) return;

    map.setPaintProperty('rent-heatmap', 'fill-color', [
      'case',
      ['has', type],
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

    map.off('mousemove', 'rent-heatmap', map._handleMouseMove);
    map.off('mouseleave', 'rent-heatmap', map._handleMouseLeave);

    const handleMouseMove = (e) => {
      const feature = e.features?.[0];
      if (feature) {
        const suburb = feature.properties.vic_loca_2 || 'Unknown';
        const rent = feature.properties[selectedType];
        const rentDisplay = rent ? `$${rent}` : 'No Data';

        popupRef.current
          .setLngLat(e.lngLat)
          .setHTML(`<strong>${suburb}</strong><br/>${selectedType}: ${rentDisplay}`)
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
    map._handleMouseMove = handleMouseMove;
    map._handleMouseLeave = handleMouseLeave;
  };

  const getRecommendations = (geojson, type, userSuburb, userIncome, currentRent) => {
    if (!geojson || !type || !userSuburb || !userIncome || !currentRent) return [];

    const userFeature = geojson.features.find(f =>
      f.properties.vic_loca_2?.toLowerCase() === userSuburb.toLowerCase()
    );
    if (!userFeature) return [];

    const userCenter = turf.center(userFeature).geometry.coordinates;

    const affordable = geojson.features
      .map(f => {
        const rent = f.properties[type];
        if (!rent || rent >= 0.3 * userIncome) return null;
        const center = turf.center(f).geometry.coordinates;
        const distance = turf.distance(turf.point(userCenter), turf.point(center), { units: 'kilometers' });
        if (distance > radius) return null;

        const saved = currentRent - rent;

        return {
          suburb: f.properties.vic_loca_2,
          rent,
          center,
          distance,
          saved: saved > 0 ? saved : 0,
          feature: f
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.distance - b.distance);

    return affordable.slice(0, 5);
  };

  const highlightRecommendations = (map, features) => {
    const geo = {
      type: 'FeatureCollection',
      features: features.map(r => r.feature)
    };

    if (!map.getSource('recommendation-highlight')) {
      map.addSource('recommendation-highlight', {
        type: 'geojson',
        data: geo,
      });
      map.addLayer({
        id: 'recommendation-outline',
        type: 'line',
        source: 'recommendation-highlight',
        paint: {
          'line-color': '#0066ff',
          'line-width': 2
        }
      });
    } else {
      map.getSource('recommendation-highlight').setData(geo);
    }
  };

  const addUserLocationMarker = (map, center) => {
    const geo = {
      type: 'FeatureCollection',
      features: [{ type: 'Feature', geometry: { type: 'Point', coordinates: center } }]
    };

    if (!map.getSource('user-location')) {
      map.addSource('user-location', {
        type: 'geojson',
        data: geo
      });
      map.addLayer({
        id: 'user-location-circle',
        type: 'circle',
        source: 'user-location',
        paint: {
          'circle-radius': 6,
          'circle-color': '#0066ff',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      }, 'rent-heatmap');
    } else {
      map.getSource('user-location').setData(geo);
    }
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [144.9631, -37.8136],
      zoom: 9,
    });

    mapRef.current = map;

    map.on('load', async () => {
      const response = await fetch('/enhanced_rental_by_sa2.geojson');
      const geojson = await response.json();
      setGeojsonData(geojson);

      map.addSource('sa2-rent', {
        type: 'geojson',
        data: geojson,
      });
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

      updateInteraction(map, selectedType);

      const stored = JSON.parse(localStorage.getItem('sustainabilityData'));
      const valid = stored?.suburb && stored?.income && stored?.rentRatio && stored?.rent;
      setHasValidUserData(!!valid);

      if (valid) {
        const matched = geojson.features.find(f =>
          f.properties.vic_loca_2?.toLowerCase() === stored.suburb.toLowerCase()
        );
        if (matched) {
          const center = turf.center(matched).geometry.coordinates;
          map.flyTo({ center, zoom: 11, speed: 1.2, curve: 1.5 });
          addUserLocationMarker(map, center);
        }
      }
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    updateInteraction(map, selectedType);

    if (!geojsonData || !hasValidUserData) return;

    const stored = JSON.parse(localStorage.getItem('sustainabilityData'));
    if (!stored?.suburb || !stored?.income || !stored?.rentRatio || !stored?.rent) return;

    const rentRatio = parseFloat(stored.rentRatio);
    if (rentRatio > 35) {
      const recs = getRecommendations(
        geojsonData,
        selectedType,
        stored.suburb,
        stored.income,
        stored.rent
      );
      setRecommendations(recs);
      highlightRecommendations(map, recs);
    } else {
      setRecommendations([]);
      if (map.getSource('recommendation-highlight')) {
        map.removeLayer('recommendation-outline');
        map.removeSource('recommendation-highlight');
      }
    }
  }, [selectedType, geojsonData, radius, hasValidUserData]);

  return (
    <div className="housing-container">
      <div className="map-card">
        <div className="legend-box">
          <div className="legend-title">Median House Rent</div>
          <div className="legend-bar" />
          <div className="legend-scale">
            <span>$300</span>
            <span>$1300+</span>
          </div>
          {hasValidUserData && (
            <div className="legend-note">🔵 Your current living suburb</div>
          )}
        </div>
        <div ref={mapContainer} className="map-container" />
        {!hasValidUserData && (
          <div className="floating-dropdown">
            <label htmlFor="type">Choose House Type:</label>
            <select id="type" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
              {houseTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
        )}
      </div>


      {hasValidUserData && (
        <div className={`control-card ${hasValidUserData ? 'no-background' : ''}`}>
          <div className="dropdown-box">
            <label htmlFor="type">Choose House Type:</label>
            <select id="type" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
              {houseTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="radius">Recommendation Radius (1–20 km):</label>
            <input type="number" id="radius" min={1} max={20} value={radius} onChange={e => setRadius(Number(e.target.value))} />
          </div>

          {recommendations.length > 0 && (
            <div className="recommendation-box">
              <h4>Recommended Suburbs (within {radius}km)</h4>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Housing;