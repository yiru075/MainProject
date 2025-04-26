import React, { useEffect, useState } from 'react';
import './news.css';

// New Supabase endpoint and token
const SUPABASE_URL = 'https://zikibbiiudsntbyqmxcp.supabase.co/functions/v1/rss_news';
const SUPABASE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inppa2liYmlpdWRzbnRieXFteGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1ODI1MTEsImV4cCI6MjA2MTE1ODUxMX0.n_XCkaptcADXHh0UOHr-RNFojIebdS9BuaC3GEGrsMs';

const News = () => {
  const [feeds, setFeeds] = useState({
    diet: [],
    exercise: [],
    mental: []
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  // Sample articles for each category when no results found
  const sampleArticles = {
    diet: [
      {
        title: "Healthy Eating Habits for Retirement",
        link: "https://example.com/healthy-eating",
        content: "<p>Maintaining a balanced diet rich in fruits, vegetables, lean proteins, and whole grains is essential for healthy aging. <img src='https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600' alt='healthy food' /></p>",
        pubDate: new Date().toISOString(),
        imageUrl: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600"
      },
      {
        title: "Nutrition Tips for Seniors",
        link: "https://example.com/nutrition-seniors",
        content: "<p>As we age, our nutritional needs change. Learn about important nutrients for maintaining health in your golden years. <img src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600' alt='healthy meal' /></p>",
        pubDate: new Date(Date.now() - 86400000).toISOString(),
        imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600"
      }
    ],
    exercise: [
      {
        title: "Low-Impact Exercises for Joint Health",
        link: "https://example.com/low-impact",
        content: "<p>Stay active without stressing your joints with these gentle but effective exercise routines perfect for seniors. <img src='https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600' alt='senior exercise' /></p>",
        pubDate: new Date().toISOString(),
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600"
      },
      {
        title: "Building Strength at Any Age",
        link: "https://example.com/strength-training",
        content: "<p>It's never too late to build muscle and improve your strength. These exercises can be modified for any fitness level. <img src='https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600' alt='strength training' /></p>",
        pubDate: new Date(Date.now() - 172800000).toISOString(),
        imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600"
      }
    ],
    mental: [
      {
        title: "Mindfulness Practices for Better Mental Health",
        link: "https://example.com/mindfulness",
        content: "<p>Simple mindfulness techniques that can reduce stress, improve focus, and enhance your overall wellbeing. <img src='https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?w=600' alt='meditation' /></p>",
        pubDate: new Date().toISOString(),
        imageUrl: "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?w=600"
      },
      {
        title: "Staying Socially Connected in Retirement",
        link: "https://example.com/social-connection",
        content: "<p>Maintaining social connections is vital for mental health. Discover ways to build and maintain relationships in retirement. <img src='https://images.unsplash.com/photo-1536122985607-4fe00b283652?w=600' alt='social gathering' /></p>",
        pubDate: new Date(Date.now() - 259200000).toISOString(),
        imageUrl: "https://images.unsplash.com/photo-1536122985607-4fe00b283652?w=600"
      }
    ]
  };

  const extractImage = (item) => {
    // First check if the item has a direct imageUrl property
    if (item.imageUrl) {
      return item.imageUrl;
    }
    
    // Then try to extract from content
    const match = item?.content?.match(/<img.*?src=["'](https?:\/\/.*?)["']/);
    return match ? match[1] : null;
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
        
        // Assuming the API returns data in the format { diet: [], exercise: [], mental: [] }
        setFeeds(data);
      } catch (error) {
        console.error('Error fetching feeds:', error);
        setError('Unable to load news data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews(); // Initial load
    
    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const filterBySearch = (items) => {
    if (!search.trim()) return items;
    return items.filter(item =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.content?.toLowerCase().includes(search.toLowerCase())
    );
  };

  const renderCard = (item, index) => {
    const img = extractImage(item);
    return (
      <div className="card" key={index}>
        {img && <img src={img} alt="cover" className="news-image" />}
        <h3><a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a></h3>
        <p>{item.content?.replace(/<[^>]+>/g, '').substring(0, 150) || 'No summary available.'}...</p>
        <small>{new Date(item.pubDate).toLocaleString()}</small>
      </div>
    );
  };

  const renderFeed = (items = [], category) => {
    const filteredItems = filterBySearch(items);
    
    // If there are filtered items, display them
    if (filteredItems.length > 0) {
      return filteredItems.map((item, index) => renderCard(item, index));
    } 
    
    // If no search results but search is active, show message
    if (search.trim()) {
      return <div className="no-articles">No articles found matching your search</div>;
    }
    
    // If no items at all (not due to search), show sample articles that look exactly like real ones
    return sampleArticles[category].map((item, index) => renderCard(item, index));
  };

  return (
    <div className="App">
      <div className="cover">
        <div className="cover-title">Health & Wellbeing News</div>
      </div>
      
      <input
        type="text"
        placeholder="Search news by keyword..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {loading ? (
        <div className="loading-message">Loading articles...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="columns">
          <div>
            <h2>Diet & Nutrition</h2>
            {renderFeed(feeds.diet, 'diet')}
          </div>
          <div>
            <h2>Exercise & Fitness</h2>
            {renderFeed(feeds.exercise, 'exercise')}
          </div>
          <div>
            <h2>Mental Health</h2>
            {renderFeed(feeds.mental, 'mental')}
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
