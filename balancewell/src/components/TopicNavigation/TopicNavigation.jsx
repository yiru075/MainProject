import React, { useEffect } from 'react';
import { Button, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

/**
 * TopicNavigation component for navigating between topic pages
 * @param {Object} props Component props
 * @param {string} props.currentLevel Current level (e.g. "level1")
 * @param {number} props.currentTopic Current topic number (e.g. 1 for Topic1_1)
 * @param {number} props.topicsInLevel Total number of topics in the current level
 */
const TopicNavigation = ({ currentLevel, currentTopic, topicsInLevel }) => {
  const navigate = useNavigate();

  // Save completed topic to localStorage
  const saveCompletedTopic = () => {
    try {
      // Format topic ID to match the education page format: "Topic1_1"
      const levelNumber = currentLevel.slice(-1);
      const topicId = `Topic${levelNumber}_${currentTopic}`;
      
      // Get existing completed topics from localStorage or initialize empty array
      const completedTopics = JSON.parse(localStorage.getItem('completedTopics') || '[]');
      
      // Add current topic if not already in the list
      if (!completedTopics.includes(topicId)) {
        completedTopics.push(topicId);
        localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
        console.log(`Marked topic ${topicId} as completed`);
      }
    } catch (error) {
      console.error('Error saving completed topic to localStorage:', error);
    }
  };

  // Mark current topic as completed when the component is mounted
  useEffect(() => {
    saveCompletedTopic();
  }, [currentLevel, currentTopic]);

  const goToPreviousTopic = () => {
    if (currentTopic > 1) {
      navigate(`/${currentLevel}/Topic${currentLevel.slice(-1)}_${currentTopic - 1}`);
    }
  };

  const goToNextTopic = () => {
    if (currentTopic < topicsInLevel) {
      navigate(`/${currentLevel}/Topic${currentLevel.slice(-1)}_${currentTopic + 1}`);
    }
  };

  return (
    <Space style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', width: '100%' }}>
      <Button 
        type="primary" 
        icon={<LeftOutlined />} 
        onClick={goToPreviousTopic}
        disabled={currentTopic === 1}
      >
        Previous Topic
      </Button>
      <Button 
        type="primary" 
        icon={<RightOutlined />} 
        onClick={goToNextTopic} 
        disabled={currentTopic === topicsInLevel}
      >
        Next Topic
      </Button>
    </Space>
  );
};

export default TopicNavigation; 