import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Badge, Progress, Tag, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CheckCircleFilled, TrophyOutlined, ReloadOutlined } from '@ant-design/icons';
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
    { id: 'Topic2_4', title: 'Investment Options Within Super', description: 'Exploring the various investment choices available in your super fund.' },
    { id: 'Topic2_5', title: 'Employer vs Personal Contributions', description: 'Understanding the difference between employer and voluntary contributions.' },
    { id: 'Topic2_6', title: 'Superannuation and Life Events', description: 'How life events can impact your superannuation strategy.' },
    { id: 'Topic2_7', title: 'Retirement Planning Basics', description: 'Introduction to retirement planning and how super fits in.' },
    { id: 'Topic2_8', title: 'Super Fund Performance Metrics', description: 'How to evaluate and compare super fund performance.' },
    { id: 'Topic2_4', title: 'Investment Options Within Super', description: 'Exploring the various investment choices available in your super fund.' }
  ],
  3: [
    { id: 'Topic3_1', title: 'Advanced Super Strategies', description: 'Strategic approaches to optimize your superannuation.' },
    { id: 'Topic3_2', title: 'Self-Managed Super Funds (SMSFs)', description: 'Understanding the responsibilities and benefits of running your own super fund.' },
    { id: 'Topic3_3', title: 'Superannuation and Tax Planning', description: 'Tax-effective strategies related to superannuation contributions and withdrawals.' },
    { id: 'Topic3_4', title: 'Estate Planning and Super', description: 'How superannuation interacts with your estate planning strategies.' },
    { id: 'Topic3_5', title: 'International Aspects of Super', description: 'Managing superannuation when moving overseas or returning to Australia.' },
    { id: 'Topic3_3', title: 'Superannuation and Tax Planning', description: 'Tax-effective strategies related to superannuation contributions and withdrawals.' }
  ]
};

// 修正重复的主题数据
const fixedLevelTopics = {
  1: levelTopics[1],
  2: levelTopics[2].filter((topic, index, self) => 
    index === self.findIndex(t => t.id === topic.id)
  ),
  3: levelTopics[3].filter((topic, index, self) => 
    index === self.findIndex(t => t.id === topic.id)
  )
};

const Education = () => {
  const navigate = useNavigate();
  const [userLevel, setUserLevel] = useState(1);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // 加载已完成的主题
  useEffect(() => {
    const storedCompletedTopics = localStorage.getItem('completedTopics');
    if (storedCompletedTopics) {
      setCompletedTopics(JSON.parse(storedCompletedTopics));
    }
  }, []);
  
  // 计算完成进度
  useEffect(() => {
    const totalTopics = fixedLevelTopics[userLevel].length;
    const completedCount = completedTopics.filter(topic => topic.startsWith(`Topic${userLevel}_`)).length;
    const percent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
    setProgressPercent(percent);
  }, [completedTopics, userLevel]);

  const handleTopicClick = (level, topicId) => {
    // 如果主题未完成，则标记为已完成
    if (!completedTopics.includes(topicId)) {
      const updatedCompletedTopics = [...completedTopics, topicId];
      setCompletedTopics(updatedCompletedTopics);
      
      // 保存到localStorage
      localStorage.setItem('completedTopics', JSON.stringify(updatedCompletedTopics));
    }
    
    // 导航到相应的主题页面
    navigate(`/level${level}/${topicId}`);
  };

  const isTopicCompleted = (topicId) => {
    return completedTopics.includes(topicId);
  };

  // 清空当前等级的进度
  const handleResetProgress = () => {
    setIsModalVisible(true);
  };

  // 确认清空进度
  const confirmReset = () => {
    // 过滤掉当前等级的主题，只保留其他等级的主题
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
      
      <div className="progress-container">
        <div className="progress-header">
          <Text>Your progress: {progressPercent}% completed</Text>
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
          {fixedLevelTopics[userLevel]?.map((topic) => (
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
