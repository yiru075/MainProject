import React, { cloneElement, Children, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import TopicNavigation from './TopicNavigation';

/**
 * TopicPageWrapper - Wraps Topic pages and adds navigation functionality
 * Automatically extracts current level and topic number from the route path
 * and adds navigation buttons inside the Card component
 */
const TopicPageWrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Check if path matches Topic page pattern
  const topicMatch = path.match(/\/level(\d+)\/Topic(\d+)_(\d+)/);
  
  if (!topicMatch) {
    // If not a Topic page, just return children
    return <>{children}</>;
  }
  
  const levelNumber = topicMatch[1]; // 1, 2, 3 etc.
  const currentLevel = `level${levelNumber}`;
  const currentTopic = parseInt(topicMatch[3], 10); // 1, 2, 3 etc.
  const topicId = `Topic${levelNumber}_${currentTopic}`;
  
  // Set total number of topics based on level
  let topicsInLevel = 8; // Default value
  if (levelNumber === '1') {
    topicsInLevel = 8; // Level 1 has 8 topics
  } else if (levelNumber === '2') {
    topicsInLevel = 8; // Level 2 has 8 topics
  } else if (levelNumber === '3') {
    topicsInLevel = 8; // Level 3 has 8 topics
  }

  // Return to education page
  const handleBackToEducation = () => {
    navigate('/education');
  };

  // Check if topic is completed (for tracking purposes, but not showing visually)
  useEffect(() => {
    try {
      const completedTopics = JSON.parse(localStorage.getItem('completedTopics') || '[]');
      setIsCompleted(completedTopics.includes(topicId));
    } catch (error) {
      console.error('Error checking completed topic status:', error);
    }
  }, [topicId]);

  // Create a new component that will insert navigation buttons inside Card
  const childrenArray = Children.toArray(children);
  
  // Track if Card component was found
  let foundCard = false;
  
  // Add back button above the content
  const BackButton = (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'flex-start', 
      marginBottom: '1rem',
      padding: '0 2rem',
      maxWidth: 800,
      margin: '0 auto'
    }}>
      <Button 
        type="primary"
        ghost
        icon={<ArrowLeftOutlined />} 
        onClick={handleBackToEducation}
        size="middle"
        style={{ marginTop: '1rem' }}
      >
        Back to Education Page
      </Button>
    </div>
  );
  
  // Recursively find and modify Card component
  const modifyChild = (child) => {
    // Check if it's a React element
    if (!React.isValidElement(child)) {
      return child;
    }
    
    // If it's a Card component, add navigation buttons after its children
    // Note: Using displayName or checking type name because direct comparison may not be accurate
    const childType = child.type;
    const isCardComponent = 
      childType === Card || 
      (childType.displayName && childType.displayName === 'Card') ||
      (typeof childType === 'function' && childType.name === 'Card');
    
    if (isCardComponent) {
      foundCard = true;
      // Copy Card's props
      const newProps = { ...child.props };
      
      // Add navigation buttons
      const originalChildren = newProps.children;
      newProps.children = (
        <>
          {originalChildren}
          <TopicNavigation 
            currentLevel={currentLevel} 
            currentTopic={currentTopic}
            topicsInLevel={topicsInLevel}
          />
        </>
      );
      
      // Return modified Card
      return cloneElement(child, newProps);
    }
    
    // If component has children, process recursively
    if (child.props && child.props.children) {
      const newChildren = Children.map(child.props.children, (c) => modifyChild(c));
      
      // Check if Card was found in children
      if (newChildren && newChildren.some(c => c && c !== child.props.children)) {
        foundCard = true;
        return cloneElement(child, { ...child.props, children: newChildren });
      }
    }
    
    return child;
  };
  
  // Process all children
  const modifiedChildren = childrenArray.map(modifyChild);
  
  // If no Card component was found, add navigation buttons outside
  if (!foundCard) {
    return (
      <>
        {BackButton}
        {modifiedChildren}
        <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
          <TopicNavigation 
            currentLevel={currentLevel} 
            currentTopic={currentTopic}
            topicsInLevel={topicsInLevel}
          />
        </div>
      </>
    );
  }
  
  return (
    <>
      {BackButton}
      {modifiedChildren}
    </>
  );
};

export default TopicPageWrapper; 