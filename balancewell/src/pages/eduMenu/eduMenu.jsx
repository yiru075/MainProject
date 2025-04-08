import React from 'react';
import { Card, Typography, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './eduMenu.css';

const { Title, Paragraph, Text } = Typography;

// Level descriptions
const levelData = [
  {
    level: 1,
    title: 'Level 1 – Start Strong (Basic)',
    description: 'Build a strong foundation of financial and wellbeing knowledge. Perfect for beginners who want to understand the basics of superannuation and retirement planning.',
    topics: [
      'Introduction to superannuation',
      'Understanding your super statement',
      'Finding and consolidating lost super',
      'Basic retirement planning concepts'
    ]
  },
  {
    level: 2,
    title: 'Level 2 – Know More (Intermediate)',
    description: 'Expand your knowledge with more detailed concepts and strategies. Ideal for those who understand the basics and want to optimize their retirement planning.',
    topics: [
      'Advanced super strategies',
      'Investment options within super',
      'Contribution strategies',
      'Retirement planning calculations'
    ]
  },
  {
    level: 3,
    title: 'Level 3 – Live Well (Advanced)',
    description: 'Master advanced topics for those with a solid understanding of retirement planning. Designed for people who want to take full control of their financial future.',
    topics: [
      'Self-Managed Super Funds (SMSFs)',
      'Tax-effective super strategies',
      'Estate planning and super',
      'International aspects of superannuation'
    ]
  }
];

const EduMenu = () => {
  const navigate = useNavigate();

  const handleLevelClick = (level) => {
    // Store the selected level in localStorage as trylevel
    localStorage.setItem('trylevel', level.toString());
    
    // Navigate to education page
    navigate('/education');
  };

  return (
    <div className="edumenu-container">
      <div className="edumenu-header">
        <Title level={2}>What you will learn</Title>
        <Paragraph className="edumenu-intro">
          Each module builds upon the knowledge from previous levels. Select a level to begin your learning journey.
        </Paragraph>
      </div>
      
      <div className="level-cards-container">
        {levelData.map((level) => (
          <Card 
            key={level.level} 
            className="level-card"
            hoverable
            bodyStyle={{ padding: '30px' }}
          >
            <div className="level-card-header">
              <Title level={3}>{level.title}</Title>
            </div>
            
            <Paragraph className="level-description">
              {level.description}
            </Paragraph>
            
            <div className="level-topics">
              <Title level={4}>Topics include:</Title>
              <ul>
                {level.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
            
            <Button 
              type="primary" 
              size="large"
              className="start-level-btn"
              onClick={() => handleLevelClick(level.level)}
            >
              Select this level <RightOutlined />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EduMenu;
