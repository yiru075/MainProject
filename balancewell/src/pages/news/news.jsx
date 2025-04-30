import React, { useEffect, useState } from 'react';
import './news.css';

// Updated Supabase endpoint with new RSS feed
const SUPABASE_URL = 'https://zikibbiiudsntbyqmxcp.supabase.co/functions/v1/rss_news';
const SUPABASE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inppa2liYmlpdWRzbnRieXFteGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1ODI1MTEsImV4cCI6MjA2MTE1ODUxMX0.n_XCkaptcADXHh0UOHr-RNFojIebdS9BuaC3GEGrsMs';

// Financial news RSS feed URL for reference (used in Supabase function)
// https://rss.app/feeds/ipjk7S65gKIZY1Rv.xml

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  // Process articles to handle different types (topics vs regular articles)
  const processArticles = (data) => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map(item => {
      // Check if this is a topic entry
      const isTopic = item.title?.includes('Topic');
      const isSpecificArticle = !isTopic && item.link?.includes('news');
      
      // Default image for ABC News logo
      const defaultImage = 'https://www.abc.net.au/news-assets/touchicon.png';
      
      // Extract image if available
      let image = defaultImage;
      if (!isTopic) {
        const imgMatch = item?.content?.match(/<img.*?src=["'](https?:\/\/.*?)["']/);
        if (imgMatch && imgMatch[1]) {
          image = imgMatch[1];
        }
      }
      
      // Format date
      let formattedDate = '';
      try {
        const date = new Date(item.pubDate);
        formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      } catch (e) {
        formattedDate = item.pubDate || '';
      }
      
      // Extract description
      let description = '';
      if (isTopic) {
        description = 'Browse stories related to ' + item.title.split(' - ')[0];
      } else {
        description = item.content
          ?.replace(/<[^>]+>/g, '') // Remove HTML tags
          ?.substring(0, 120) || ''; // Limit length
      }
      
      return {
        ...item,
        isTopic,
        isSpecificArticle,
        image,
        formattedDate,
        description
      };
    });
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      
      try {
        const response = await fetch(SUPABASE_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_TOKEN}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error fetching news: ${response.status}`);
        }
        
        const data = await response.json();
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching feeds:', error);
        setError('Unable to load news data. Please try again later.');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    
    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Filter articles based on search term
  const filteredArticles = processArticles(articles).filter(item => {
    if (!search.trim()) return true;
    
    return (
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="news-container">
      <header className="news-header">
        <h1>Safe and Settled News Feed</h1>
        <p>Stay informed. Plan smart. Thrive financially.</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search financial news..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="loading-message">Loading articles...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="news-cards-grid">
          {filteredArticles.length === 0 ? (
            <div className="no-articles">No articles found matching your search</div>
          ) : (
            filteredArticles.map((item, index) => (
              <div className={item.isTopic ? "news-card topic-card" : "news-card"} key={index}>
                <div className="news-image-container">
                  <img src={item.image} alt={item.title} className="news-image" />
                </div>
                <div className="news-content">
                  <h3 className={item.isTopic ? "topic-title" : ""}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </h3>
                  <p className="news-description">{item.description}</p>
                  <p className="news-date">{item.formattedDate}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default News;
