export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { lat, lng, category = 'health' } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Missing lat or lng parameters' });
    }
  
    const username = process.env.EVENTFINDA_USERNAME;
    const password = process.env.EVENTFINDA_PASSWORD;
    if (!username || !password) {
      return res.status(500).json({ error: 'Missing API credentials' });
    }
  
    const authHeader = Buffer.from(`${username}:${password}`).toString('base64');
  
    const fetchEvents = async (keyword) => {
      const encoded = encodeURIComponent(keyword);
      const url = `https://api.eventfinda.com.au/v2/events.json?q=${encoded}&free=1&point=${lat},${lng}&radius=20&rows=20&order=distance`;
      const response = await fetch(url, {
        headers: { Authorization: `Basic ${authHeader}` },
      });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      return data.events || [];
    };
  
    try {
      let events = [];
  
      if (category === 'health') {
        events = await fetchEvents('health');
      } else if (category === 'social') {
        const [socialEvents, wellbeingEvents] = await Promise.all([
          fetchEvents('social'),
          fetchEvents('wellbeing'),
        ]);
  
        const seen = new Set();
        events = [...socialEvents, ...wellbeingEvents].filter((event) => {
          if (seen.has(event.id)) return false;
          seen.add(event.id);
          return true;
        });
      } else {
        return res.status(400).json({ error: 'Invalid category' });
      }
  
      return res.status(200).json({ events });
    } catch (err) {
      console.error('Eventfinda fetch failed:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  