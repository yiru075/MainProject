import React, { useEffect, useState } from 'react';
import { Card, Input, Typography, Spin, Row, Col, Tabs } from 'antd';
import axios from 'axios';

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

const NewsFeed = () => {
  const [articles, setArticles] = useState({
    diet: [],
    exercise: [],
    mental: []
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // RSS feed URLs
  const feedUrls = {
    diet: 'https://rss.app/feeds/YzBOIqqBNLHyw3yb.xml',
    exercise: 'https://rss.app/feeds/u313nh5diwfVRYeB.xml',
    mental: 'https://rss.app/feeds/TlBKbedwF2EhYf4d.xml'
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const results = {};
        
        // Fetch all RSS feeds in parallel
        const requests = Object.entries(feedUrls).map(async ([category, url]) => {
          try {
            const response = await axios.get(
              `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
            );
            
            if (response.data.status === 'ok' && Array.isArray(response.data.items)) {
              results[category] = response.data.items;
            } else {
              results[category] = [];
            }
          } catch (error) {
            console.error(`Error fetching ${category} feed:`, error);
            results[category] = [];
          }
        });
        
        await Promise.all(requests);
        setArticles(results);
      } catch (error) {
        console.error('Failed to fetch RSS:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const extractImage = (html) => {
    const match = html?.match(/<img.*?src=\"(https?:\/\/.*?)\"/);
    return match ? match[1] : null;
  };

  // Filter articles based on search term and active tab
  const getFilteredArticles = () => {
    const lower = searchTerm.toLowerCase();
    
    let filtered = [];
    
    if (activeTab === 'all') {
      // Combine all categories
      Object.values(articles).forEach(categoryArticles => {
        filtered = [...filtered, ...categoryArticles];
      });
    } else {
      // Show only the active tab category
      filtered = articles[activeTab] || [];
    }
    
    // Apply search filter if there's a search term
    if (lower) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(lower) ||
        article.content?.toLowerCase().includes(lower)
      );
    }
    
    return filtered;
  };

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  const filteredArticles = getFilteredArticles();

  return (
    <div style={{ padding: '30px' }}>
      <Title level={2}>📰 Health & Wellbeing News</Title>

      <Search
        placeholder="Search articles..."
        enterButton
        size="large"
        onSearch={handleSearch}
        style={{ maxWidth: 400, marginBottom: 30 }}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <Tabs defaultActiveKey="all" onChange={onTabChange} style={{ marginBottom: 20 }}>
        <TabPane tab="All News" key="all" />
        <TabPane tab="Diet & Nutrition" key="diet" />
        <TabPane tab="Exercise & Fitness" key="exercise" />
        <TabPane tab="Mental Health" key="mental" />
      </Tabs>

      {loading ? (
        <Spin tip="Loading..." size="large" />
      ) : (
        <Row gutter={[24, 24]}>
          {filteredArticles.map((item, index) => {
            const image = extractImage(item.content);
            return (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card
                  hoverable
                  cover={image && <img alt="news" src={image} style={{ height: 200, objectFit: 'cover' }} />}
                >
                  <Card.Meta
                    title={<a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                    description={
                      <>
                        <Paragraph ellipsis={{ rows: 3 }}>{item.content?.replace(/<[^>]+>/g, '')}</Paragraph>
                        <small>{new Date(item.pubDate).toLocaleString()}</small>
                      </>
                    }
                  />
                </Card>
              </Col>
            );
          })}
          
          {filteredArticles.length === 0 && (
            <Col span={24}>
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <p>No articles found matching your search criteria.</p>
              </div>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default NewsFeed;
