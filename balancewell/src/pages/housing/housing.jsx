import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
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

// const getCoordsFromSuburb = async (suburb) => {
//   const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(suburb)}.json?access_token=${mapboxgl.accessToken}`);
//   const data = await response.json();
//   if (data.features && data.features.length > 0) {
//     return data.features[0].center;
//   }
//   return null;
// };

const getCoordsFromSuburb = async (suburb) => {
  try {
    const baseUrl = import.meta.env.VITE_WEBSITE_URL;
    const response = await fetch(`${baseUrl}/api/your-geocoding-api?q=${encodeURIComponent(suburb)}`);
    if (!response.ok) {
      throw new Error('Failed to retrieve location');
    }
    const data = await response.json();

    // Extract the center point from the first feature
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
          .setHTML(`<strong>${suburb}</strong><br/>${type}: ${rentDisplay}`)
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
      });

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
        // const allFeatures = [];
        // const pageSize = 1000;
        // let page = 1;
        // let hasMore = true;

        // try {
        //   while (hasMore) {
        //     const response = await fetch(`https://cftszlhuhkvepemocmgh.supabase.co/functions/v1/get_rent_by_sa2?page=${page}&pageSize=${pageSize}`, {
        //       headers: {
        //         Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        //       }
        //     });

        //     const geojsonPage = await response.json();

        //     if (!geojsonPage.features || geojsonPage.features.length === 0) {
        //       hasMore = false;
        //       break;
        //     }

        //     allFeatures.push(...geojsonPage.features);
        //     page++;
        //   }

        //   const geojson = {
        //     type: 'FeatureCollection',
        //     features: allFeatures,
        //   };
        try {
          const response = await fetch('/api/enhanced_rental');
          if (!response.ok) {
            throw new Error('Upload failed');
          }
          const geojson = await response.json();
        
          geojsonRef.current = geojson;
        
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
        

          geojsonRef.current = geojson;

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

            if (rentRatio > 35) {
              setShowControlPanel(true);
              generateRecommendations(geojson, userCoordsRef.current, income, suburb, rent);
            }
          }

        } catch (err) {
          console.error('Failed to load map data:', err);
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
      showControlPanel
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

        {recommendations.length === 0 ? (
          <div>No suitable suburbs within selected range.</div>
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
  );
};

export default Housing;