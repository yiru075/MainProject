import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Badge, Progress, Tag, Button, Modal, Space } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircleFilled, TrophyOutlined, ReloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './education.css';

const { Title, Text } = Typography;

// Topic data for each level
const levelTopics = {
  1: [
    { id: 'Topic1_1', title: 'What is Superannuation and Why Does It Matter?', description: 'Understanding the basics of superannuation and its importance for your future.' },
    { id: 'Topic1_2', title: 'What is Financial Literacy?', description: 'Learn about financial literacy and why it matters for everyday life, especially as you age.' },
    { id: 'Topic1_3', title: 'What is a Budget and Why Is It Helpful?', description: 'Understand what a budget is in simple terms and how it helps with planning your money.' },
    { id: 'Topic1_4', title: 'What is Rent Stress?', description: 'Learn what rent stress means and how to know if you\'re spending too much on rent.' },
    { id: 'Topic1_5', title: 'What is Healthy Food After 40?', description: 'Learn about key nutrients, energy, health, and simple food choices that support your budget and wellbeing.' },
    { id: 'Topic1_6', title: 'What Does Aging Well Look Like?', description: 'Learn what healthy aging means in everyday terms and small things you can do to age with strength.' },
    { id: 'Topic1_7', title: 'What is "Safe to Spend" and How Do I Know Mine?', description: 'Learn what "Safe to Spend" means and how to estimate your safe spending amount.' },
    { id: 'Topic1_8', title: 'Who Can Help Me with Money or Support?', description: 'Where to go for trusted, free financial and wellbeing help in Australia.' }
  ],
  2: [
    { id: 'Topic2_1', title: 'How to Check Your Super Balance via MyGov', description: 'Step-by-step guide to checking your super through the government portal.' },
    { id: 'Topic2_2', title: 'How Compound Interest Grows Your Super', description: 'Learn how small amounts in super can grow over time through compound interest.' },
    { id: 'Topic2_3', title: 'Difference Between Needs and Wants', description: 'Understanding what needs and wants mean in personal budgeting and why it matters.' },
    { id: 'Topic2_4', title: 'How Much Rent Is Too Much?', description: 'Understanding rent-to-income ratio and the threshold for rent stress in Australia.' },
    { id: 'Topic2_5', title: 'Affordable Staples That Support Energy and Health', description: 'Learn about low-cost nutritious foods that support your health as you age.' },
    { id: 'Topic2_6', title: 'Free or Low-Cost Health Check-ups & Screenings in Victoria', description: 'Discover health check-ups and screenings available at little or no cost in Victoria.' },
    { id: 'Topic2_7', title: 'How to Read a Food Label (Salt, Sugar, Fats)', description: 'Learn what nutrition labels mean and where to find key health information on packaged foods.' },
    { id: 'Topic2_8', title: 'Understanding Centrelink Rent Assistance', description: 'Learn what Rent Assistance is, who may be eligible, and where to check eligibility.' }
  ],
  3: [
    { id: 'Topic3_1', title: 'Creating a Simple Weekly Budget', description: 'Learn how to create a simple weekly budget to manage your everyday spending effectively.' },
    { id: 'Topic3_2', title: 'Tracking Your Spending with a Template', description: 'Tools and methods to track where your money goes each week or day.' },
    { id: 'Topic3_3', title: 'What to Do If You Didn\'t Work in a Formal Job (Super Gaps)', description: 'Understanding superannuation gaps and options if you have little or no super.' },
    { id: 'Topic3_4', title: 'Sample Weekly Meal Plan Under $50', description: 'Practical examples of how to eat healthy on a budget with a sample meal plan.' },
    { id: 'Topic3_5', title: 'Understanding Safe and Affordable Suburbs', description: 'What to consider when choosing where to live for affordability and support.' },
    { id: 'Topic3_6', title: 'Budgeting Around Remittances and Family Support', description: 'How to budget when sending money to family overseas while maintaining your own financial health.' },
    { id: 'Topic3_7', title: 'Staying Physically Active Without a Gym', description: 'Simple, low-cost ways to stay active at home or in your neighbourhood.' },
    { id: 'Topic3_8', title: 'Staying Socially Connected in Later Life', description: 'Why social connection is important and how to feel less isolated without spending money.' }
  ]
};

const Education = () => {
  const navigate = useNavigate();
  const [userLevel, setUserLevel] = useState(1);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAssessedLevel, setIsAssessedLevel] = useState(false);
  
  // Load completed topics from local storage
  useEffect(() => {
    const storedCompletedTopics = localStorage.getItem('completedTopics');
    if (storedCompletedTopics) {
      setCompletedTopics(JSON.parse(storedCompletedTopics));
    }
  }, []);
  
  // Calculate completion progress
  useEffect(() => {
    const totalTopics = levelTopics[userLevel].length;
    const completedCount = completedTopics.filter(topic => topic.startsWith(`Topic${userLevel}_`)).length;
    const percent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
    setProgressPercent(percent);
  }, [completedTopics, userLevel]);

  // Load user level from localStorage on component mount
  useEffect(() => {
    const savedLevel = localStorage.getItem('userLevel');
    const tryLevel = localStorage.getItem('trylevel');
    
    if (savedLevel) {
      setUserLevel(parseInt(savedLevel));
      setIsAssessedLevel(true);
    } else if (tryLevel) {
      // If user has selected a level to try but hasn't completed assessment
      setUserLevel(parseInt(tryLevel));
      setIsAssessedLevel(false);
    } else {
      // If no level data is available, redirect to eduMenu
      navigate('/eduMenu');
    }
  }, [navigate]);

  const handleTopicClick = (level, topicId) => {
    // Mark topic as completed if not already completed
    if (!completedTopics.includes(topicId)) {
      const updatedCompletedTopics = [...completedTopics, topicId];
      setCompletedTopics(updatedCompletedTopics);
      
      // Save to localStorage
      localStorage.setItem('completedTopics', JSON.stringify(updatedCompletedTopics));
    }
    
    // Navigate to the corresponding topic page
    navigate(`/level${level}/${topicId}`);
  };

  const isTopicCompleted = (topicId) => {
    return completedTopics.includes(topicId);
  };

  // Reset progress for current level
  const handleResetProgress = () => {
    setIsModalVisible(true);
  };

  // Confirm progress reset
  const confirmReset = () => {
    // Filter out topics from current level, keep topics from other levels
    const filteredTopics = completedTopics.filter(
      topic => !topic.startsWith(`Topic${userLevel}_`)
    );
    
    setCompletedTopics(filteredTopics);
    localStorage.setItem('completedTopics', JSON.stringify(filteredTopics));
    setIsModalVisible(false);
  };

  return (
    <div className="education-container">
      <div className="education-header">
        <Title level={2}>Education Resources</Title>
        <Text>Your current level: <Badge count={userLevel} style={{ backgroundColor: '#FFC107', color: '#000' }} /></Text>
      </div>
      
      {!isAssessedLevel && (
        <div className="quiz-reminder">
          <Space align="center">
            <QuestionCircleOutlined />
            <Text>
              You're currently exploring Level {userLevel}. For a personalized recommendation based on your knowledge, 
              take our quick assessment quiz.
            </Text>
            <Link to="/quiz">
              <Button type="primary" size="small">Take Quiz</Button>
            </Link>
          </Space>
        </div>
      )}
      
      <div className="progress-container">
        <div className="progress-header">
          {progressPercent === 100 && (
            <Button 
              type="primary" 
              icon={<ReloadOutlined />} 
              onClick={handleResetProgress}
              className="reset-button"
            >
              Reset Progress
            </Button>
          )}
          <Text>Your progress: {progressPercent}% completed</Text>
        </div>
        <Progress percent={progressPercent} strokeColor="#FFC107" />
        {progressPercent === 100 && (
          <div className="completion-message">
            <TrophyOutlined className="trophy-icon" />
            <Text strong>Congratulations! You've completed all topics for this level.</Text>
          </div>
        )}
      </div>
      
      <div className="topics-container">
        <Title level={3}>Topics For Your Level</Title>
        <Row gutter={[16, 16]}>
          {levelTopics[userLevel]?.map((topic) => (
            <Col xs={24} sm={12} md={8} key={topic.id}>
              <Card 
                hoverable
                className={`topic-card ${isTopicCompleted(topic.id) ? 'completed-topic' : ''}`}
                onClick={() => handleTopicClick(userLevel, topic.id)}
                extra={isTopicCompleted(topic.id) && (
                  <Tag className="completed-tag">
                    <CheckCircleFilled /> Done
                  </Tag>
                )}
              >
                <Title level={4}>
                  {topic.title}
                  {isTopicCompleted(topic.id) && <CheckCircleFilled className="completed-icon" />}
                </Title>
                <Text type="secondary">{topic.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal 
        title="Reset Progress" 
        open={isModalVisible} 
        onOk={confirmReset} 
        onCancel={() => setIsModalVisible(false)}
        okText="Yes, reset my progress"
        cancelText="Cancel"
      >
        <p>Are you sure you want to reset your progress for Level {userLevel}?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default Education;
