export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      return res.status(200).end(); 
    }
  
    const coords = req.query.coords;
    if (!coords) {
      return res.status(400).json({ error: 'Missing coords query param' });
    }
  
    const MAPBOX_TOKEN =  process.env.VITE_MAPBOX_TOKEN_ONE;
    if (!MAPBOX_TOKEN) {
      return res.status(500).json({ error: 'Mapbox token is not configured' });
    }
  
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?types=place,locality,neighborhood&country=au&access_token=${MAPBOX_TOKEN}`;
      const response = await fetch(url);
      const data = await response.json();
  
      const filtered = data.features.filter((feature) =>
        (feature.context || []).some(
          (c) =>
            c.id.startsWith('region') &&
            (c.text === 'Victoria' || c.short_code === 'AU-VIC')
        )
      );
  
      res.status(200).json({
        features: filtered,
        originalFeatureCount: data.features.length,
        victoriaFeatureCount: filtered.length,
      });
    } catch (error) {
      console.error('Mapbox reverse geocoding error:', error);
      res.status(500).json({ error: 'Failed to fetch from Mapbox' });
    }
  }
  