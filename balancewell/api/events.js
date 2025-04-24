export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { lat, lng, category = 'health' } = req.query;
  
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Missing lat or lng parameters' });
    }
  
    const allowedCategories = ['health', 'social', 'wellbeing'];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
  
    const username = process.env.EVENTFINDA_USERNAME;
    const password = process.env.EVENTFINDA_PASSWORD;
  
    if (!username || !password) {
      return res.status(500).json({ error: 'Server misconfiguration: Missing API credentials' });
    }
  
    const authHeader = Buffer.from(`${username}:${password}`).toString('base64');
  
    const encodedCategory = encodeURIComponent(category);
    const url = `https://api.eventfinda.com.au/v2/events.json?q=${encodedCategory}&free=1&point=${lat},${lng}&radius=20&rows=20&order=distance`;
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${authHeader}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ error: `Eventfinda API error: ${errorText}` });
      }
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      console.error('Eventfinda fetch failed:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  