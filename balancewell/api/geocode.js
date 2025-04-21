export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { coords } = req.query;

    if (!coords) {
        return res.status(400).json({ error: 'Missing coords' });
    }

    const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN_ONE;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?types=place,locality&access_token=${MAPBOX_TOKEN}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch from Mapbox' });
    }
}
