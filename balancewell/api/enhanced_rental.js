export default async function handler(req, res) {
    try {
      const response = await fetch('https://yiru075.github.io/MainProject-data/enhanced_rental_by_sa2.geojson');
      if (!response.ok) {
        throw new Error('Failed to load GitHub file');
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: 'Unable to load data' });
    }
  }
  