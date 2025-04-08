import React, { useEffect, useState } from 'react';
import { Card, Input, Typography, Spin, Row, Col } from 'antd';
import axios from 'axios';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://cftszlhuhkvepemocmgh.supabase.co/functions/v1/rss-reader',
          {
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmdHN6bGh1aGt2ZXBlbW9jbWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwOTAwODUsImV4cCI6MjA1OTY2NjA4NX0.uTI2trAx3IfqdBw7YRYYyk00CbICNfQaf4Lqiug5Ed0',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            }
          }
        );
        setArticles(response.data);
        setFiltered(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch RSS:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const lower = value.toLowerCase();
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(lower) ||
      article.content?.toLowerCase().includes(lower)
    );
    setFiltered(results);
  };

  const extractImage = (html) => {
    const match = html?.match(/<img.*?src=\"(.*?)\"/);
    return match ? match[1] : null;
  };

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

      {loading ? (
        <Spin tip="Loading..." size="large" />
      ) : (
        <Row gutter={[24, 24]}>
          {filtered.map((item, index) => {
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
        </Row>
      )}
    </div>
  );
};

export default NewsFeed;
