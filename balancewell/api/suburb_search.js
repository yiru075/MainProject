export default async function handler(req, res) {
  // res.setHeader('Access-Control-Allow-Origin', '*'); 
  // res.setHeader('Access-Control-Allow-Origin', 'https://safeandsettled.vercel.app');
  const allowedOrigins = [
    'https://safeandsettled.vercel.app',
    'https://iteration2-safeandsettled.vercel.app',
    'https://iteration3-safeandsettled.vercel.app'
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const query = req.query.q;
  const sessionToken = req.query.session_token || 'default_token';

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  const victoriaBbox = '140.9617,-39.1592,149.9760,-33.9806';
  const accessToken = process.env.VITE_MAPBOX_TOKEN_ONE;

  if (!accessToken) {
    return res.status(500).json({ error: 'Mapbox access token is not configured' });
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
              `country=au&limit=10&types=place%2Clocality%2Cneighborhood&language=en-US` +
              `&bbox=${victoriaBbox}&session_token=${sessionToken}&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status}`);
    }

    const data = await response.json();

    const filtered = data.features.filter(feature =>
      feature.context?.some(c =>
        (c.id.startsWith('region') && (c.text === 'Victoria' || c.short_code === 'AU-VIC'))
      )
    );

    const results = filtered.map(f => ({
      name: f.place_name,
      coordinates: f.geometry.coordinates,
      state: 'VIC',
    }));

    res.status(200).json({ results });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Mapbox', details: error.message });
  }
}
