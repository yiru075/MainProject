import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import './education.css';

const { Title, Text } = Typography;

// Topic data for each level
const levelTopics = {
  1: [
    { id: 'Topic1_1', title: 'What is Superannuation and Why It Matters', description: 'Understanding the basics of superannuation and its importance for your future.' },
    { id: 'Topic1_2', title: 'Superannuation - The Basics', description: 'Learn about how superannuation works and the key terminology.' },
    { id: 'Topic1_3', title: 'Types of Superannuation Funds', description: 'Explore different types of super funds and their features.' },
    { id: 'Topic1_4', title: 'Your Super Statement Explained', description: 'How to read and understand your superannuation statement.' },
    { id: 'Topic1_5', title: 'Finding Lost Super', description: 'Steps to locate and consolidate your lost superannuation accounts.' },
    { id: 'Topic1_6', title: 'Super Guarantee - What Employers Must Pay', description: 'Understanding your entitlements under the Superannuation Guarantee.' },
    { id: 'Topic1_7', title: 'Super and Changing Jobs', description: 'What happens to your super when you change employers.' },
    { id: 'Topic1_8', title: 'Getting Help with Super', description: 'Resources and support services for superannuation assistance.' }
  ],
  2: [
    { id: 'Topic2_1', title: 'How to Check Your Super Balance via MyGov', description: 'Step-by-step guide to checking your super through the government portal.' },
    { id: 'Topic2_2', title: 'Consolidating Multiple Super Accounts', description: 'Benefits and process of combining your superannuation accounts.' },
    { id: 'Topic2_3', title: 'Understanding Super Fees', description: 'The different types of fees that can impact your super balance.' },
    { id: 'Topic2_4', title: 'Investment Options Within Super', description: 'Exploring the various investment choices available in your super fund.' }
  ],
  3: [
    { id: 'Topic3_1', title: 'Advanced Super Strategies', description: 'Strategic approaches to optimize your superannuation.' },
    { id: 'Topic3_2', title: 'Self-Managed Super Funds (SMSFs)', description: 'Understanding the responsibilities and benefits of running your own super fund.' },
    { id: 'Topic3_3', title: 'Superannuation and Tax Planning', description: 'Tax-effective strategies related to superannuation contributions and withdrawals.' }
  ]
};

const Education = () => {
  const navigate = useNavigate();
  const [userLevel, setUserLevel] = useState(1);
  
  // This simulates determining the user's level (could be from authentication/profile in a real app)
  useEffect(() => {
    // Random level between 1 and 3 for demonstration purposes
    const randomLevel = Math.floor(Math.random() * 3) + 1;
    setUserLevel(randomLevel);
  }, []);

  const handleTopicClick = (level, topicId) => {
    // Navigate to the corresponding topic page
    navigate(`/level${level}/${topicId}`);
  };

  return (
    <div className="education-container">
      <div className="education-header">
        <Title level={2}>Education Resources</Title>
        <Text>Your current level: <Badge count={userLevel} style={{ backgroundColor: '#52c41a' }} /></Text>
      </div>
      
      <div className="topics-container">
        <Title level={3}>Topics For Your Level</Title>
        <Row gutter={[16, 16]}>
          {levelTopics[userLevel]?.map((topic) => (
            <Col xs={24} sm={12} md={8} key={topic.id}>
              <Card 
                hoverable
                className="topic-card"
                onClick={() => handleTopicClick(userLevel, topic.id)}
              >
                <Title level={4}>{topic.title}</Title>
                <Text type="secondary">{topic.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Education;
