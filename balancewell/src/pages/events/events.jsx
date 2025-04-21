// import React, { useEffect, useRef, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import './events.css';

// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN_ONE;

// const Events = () => {
//     const geocoderRef = useRef(null);
//     const selectedRef = useRef(null);
//     const [suburb, setSuburb] = useState('');

//     useEffect(() => {
//         if (geocoderRef.current) {
//             geocoderRef.current.innerHTML = '';
//         }

//         const geocoder = new MapboxGeocoder({
//             accessToken: mapboxgl.accessToken,
//             types: 'locality,place',
//             placeholder: 'Enter suburb name',
//             marker: false,
//             mapboxgl,
//             countries: 'AU',
//             bbox: [140.9617, -39.1592, 150.0331, -33.9806],
//             proximity: {
//                 longitude: 144.9631,
//                 latitude: -37.8136,
//             },
//         });

//         geocoder.addTo(geocoderRef.current);

//         geocoder.on('result', (e) => {
//             const name = e.result.place_name;
//             const coords = e.result.center;
//             const context = e.result.context || [];

//             const isVictoria = context.some(
//                 (c) =>
//                     c.id.startsWith('region') &&
//                     (c.text === 'Victoria' || c.short_code === 'AU-VIC')
//             );

//             if (isVictoria) {
//                 selectedRef.current = { suburb: name, coords };
//                 setSuburb(name);
//             } else {
//                 selectedRef.current = null;
//                 alert('Please select a suburb in Victoria.');
//             }
//         });

//         return () => geocoder.clear();
//     }, []);

//     const handleUseLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 async (position) => {
//                     const { latitude, longitude } = position.coords;
//                     const coords = [longitude, latitude];

//                     // const response = await fetch(
//                     //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=place,locality&access_token=${mapboxgl.accessToken}`
//                     // );
//                     const response = await fetch(`/api/geocode?coords=${longitude},${latitude}`);

//                     const data = await response.json();
//                     if (data.features && data.features.length > 0) {
//                         const name = data.features[0].place_name;
//                         const context = data.features[0].context || [];

//                         const isVictoria = context.some(
//                             (c) =>
//                                 c.id.startsWith('region') &&
//                                 (c.text === 'Victoria' || c.short_code === 'AU-VIC')
//                         );

//                         if (isVictoria) {
//                             selectedRef.current = { suburb: name, coords };
//                             setSuburb(name);
//                             console.log('Located suburb:', name);
//                         } else {
//                             alert('Your location is outside Victoria.');
//                         }
//                     } else {
//                         alert('Unable to retrieve suburb name from your location.');
//                     }
//                 },
//                 (error) => {
//                     console.error('Location error:', error);
//                     alert('Failed to retrieve your location. Please select a suburb manually.');
//                 }
//             );
//         } else {
//             alert('Geolocation is not supported by your browser.');
//         }
//     };

//     const handleSearchClick = () => {
//         const selected = selectedRef.current;
//         if (selected) {
//             console.log('Selected suburb:', selected.suburb);
//         } else {
//             alert('Please enter or select a suburb.');
//         }
//     };

//     return (
//         <div className="event-search-wrapper">
//             <div className="event-header">
//                 <h2 className="event-title">Explore Local Health & Wellness Events</h2>
//                 <p className="event-subtitle">
//                     Find free or low-cost health checkups, workshops, and wellness activities near you.
//                 </p>
//             </div>
//             <div className="event-search-box">
//                 <div className="geocoder-container">
//                     <div ref={geocoderRef} />
//                     <button className="event-location-btn" onClick={handleUseLocation}>
//                         Use my location
//                     </button>
//                 </div>

//                 <button className="event-search-btn" onClick={handleSearchClick}>
//                     Find events near me
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Events;


import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './events.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN_ONE;

const Events = () => {
    const geocoderRef = useRef(null);
    const selectedRef = useRef(null);
    const [suburb, setSuburb] = useState('');

    useEffect(() => {
        if (geocoderRef.current) {
            geocoderRef.current.innerHTML = '';
        }

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl,
            placeholder: 'Enter suburb name',
            marker: false,
            countries: 'AU',
            types: 'place,locality',
            bbox: [140.9617, -39.1592, 150.0331, -33.9806],
            proximity: {
                longitude: 144.9631,
                latitude: -37.8136,
            },
            forwardGeocoder: async (query) => {
                const res = await fetch(`/api/geocode-by-query?query=${encodeURIComponent(query)}`);
                const data = await res.json();
                return data.features || [];
            }
        });

        geocoder.addTo(geocoderRef.current);

        geocoder.on('result', (e) => {
            const name = e.result.place_name;
            const coords = e.result.center;
            const context = e.result.context || [];

            const isVictoria = context.some(
                (c) =>
                    c.id.startsWith('region') &&
                    (c.text === 'Victoria' || c.short_code === 'AU-VIC')
            );

            if (isVictoria) {
                selectedRef.current = { suburb: name, coords };
                setSuburb(name);
            } else {
                selectedRef.current = null;
                alert('Please select a suburb in Victoria.');
            }
        });

        return () => geocoder.clear();
    }, []);

    const handleUseLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const coords = [longitude, latitude];

                    const response = await fetch(`/api/geocode?coords=${longitude},${latitude}`);
                    const data = await response.json();

                    if (data.features && data.features.length > 0) {
                        const name = data.features[0].place_name;
                        const context = data.features[0].context || [];

                        const isVictoria = context.some(
                            (c) =>
                                c.id.startsWith('region') &&
                                (c.text === 'Victoria' || c.short_code === 'AU-VIC')
                        );

                        if (isVictoria) {
                            selectedRef.current = { suburb: name, coords };
                            setSuburb(name);
                        } else {
                            alert('Your location is outside Victoria.');
                        }
                    } else {
                        alert('Unable to retrieve suburb name from your location.');
                    }
                },
                (error) => {
                    console.error('Location error:', error);
                    alert('Failed to retrieve your location.');
                }
            );
        } else {
            alert('Geolocation not supported.');
        }
    };

    const handleSearchClick = () => {
        const selected = selectedRef.current;
        if (selected) {
            console.log('Selected suburb:', selected.suburb);
        } else {
            alert('Please enter or select a suburb.');
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
                    <div ref={geocoderRef} />
                    <button className="event-location-btn" onClick={handleUseLocation}>
                        Use my location
                    </button>
                </div>

                <button className="event-search-btn" onClick={handleSearchClick}>
                    Find events near me
                </button>
            </div>
        </div>
    );
};

export default Events;

