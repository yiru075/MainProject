import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const houseTypes = [
  '1 Bed Flat',
  '2 Bed Flat',
  '2 bed house',
  '3 Bed House',
  '3 bed flat',
  '4 bed house',
];

const Housing = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [selectedType, setSelectedType] = useState('1 Bed Flat');
  const popupRef = useRef(new mapboxgl.Popup({ closeButton: false, closeOnClick: false }));

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
    map._handleMouseMove = handleMouseMove;
    map._handleMouseLeave = handleMouseLeave;
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
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    updateInteraction(map, selectedType);
  }, [selectedType]);

  return (
    <div>
      <div style={{ position: 'absolute', zIndex: 1, padding: '10px', background: 'white' }}>
        <label htmlFor="type">Choose House Type: </label>
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
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default Housing;
