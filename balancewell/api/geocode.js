export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    const coords = req.query.coords;
    const query = req.query.q;
  
    const MAPBOX_TOKEN = process.env.VITE_MAPBOX_TOKEN_ONE;
    if (!MAPBOX_TOKEN) {
      return res.status(500).json({ error: 'Mapbox token is not configured' });
    }
  
    let url;
  
    if (coords) {
      url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?types=place,locality,neighborhood&country=au&access_token=${MAPBOX_TOKEN}`;
    } else if (query) {
      url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?country=au&limit=1&types=place,locality,neighborhood&access_token=${MAPBOX_TOKEN}`;
    } else {
      return res.status(400).json({ error: 'Missing query: either coords or q is required' });
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const filtered = data.features.filter((feature) =>
        (feature.context || []).some(
          (c) =>
            c.id.startsWith('region') &&
            (c.text === 'Victoria' || c.short_code === 'AU-VIC')
        )
      );
  
      return res.status(200).json({
        features: filtered,
        originalFeatureCount: data.features.length,
        victoriaFeatureCount: filtered.length,
      });
    } catch (error) {
      console.error('Mapbox geocoding error:', error);
      return res.status(500).json({ error: 'Failed to fetch from Mapbox' });
    }
  }
  