export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');
  
    try {
      const response = await fetch('https://yiru075.github.io/MainProject-data/enhanced_rental_by_sa2.geojson');
  
      if (!response.ok) {
        throw new Error(`GitHub fetch failed: ${response.status}`);
      }
  
      const text = await response.text();
  
      try {
        const json = JSON.parse(text);
        res.status(200).json(json);
      } catch (parseError) {
        console.error('Failed to parse JSON, possibly received an HTML page:', parseError);
        res.status(500).json({ error: 'Invalid JSON received from GitHub' });
      }
  
    } catch (error) {
      console.error('API fetch error:', error);
      res.status(500).json({ error: 'Unable to load data' });
    }
  }
  