import React, { useState, useEffect } from 'react';
import { Card, Typography, Radio, Space, Button, Progress, Result } from 'antd';
import { Link } from 'react-router-dom';
import './quiz.css';

const { Title, Paragraph, Text } = Typography;

// Assessment quiz questions
const quizQuestions = [
  {
    id: 1,
    question: 'How confident are you when it comes to understanding superannuation (super)?',
    options: [
      'I\'ve heard of it, but I don\'t understand how it works',
      'I can check my super balance, but I don\'t know how it grows',
      'I understand how my super grows and how much I may need'
    ]
  },
  {
    id: 2,
    question: 'How often do you use a budget to manage your income and expenses?',
    options: [
      'I don\'t budget at all',
      'I try to budget, but I sometimes forget or give up',
      'I budget regularly and track my spending'
    ]
  },
  {
    id: 3,
    question: 'Which of the following best describes your current approach to planning?',
    options: [
      'I mostly take each day as it comes',
      'I try to plan, but I could be more consistent',
      'I use checklists or tools and make regular plans'
    ]
  },
  {
    id: 4,
    question: 'When you think about healthy aging, what best describes you?',
    options: [
      'I haven\'t really thought about it',
      'I\'ve started to think about food, movement or health changes',
      'I already follow habits that support healthy aging'
    ]
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [value, setValue] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [recommendedLevel, setRecommendedLevel] = useState(1);

  // Check for existing level in localStorage on component mount
  useEffect(() => {
    const savedLevel = localStorage.getItem('userLevel');
    if (savedLevel) {
      const level = parseInt(savedLevel);
      setRecommendedLevel(level);

      // Estimate the score based on level
      let estimatedScore = 5; // Default for level 1
      if (level === 3) {
        estimatedScore = 10; // Midpoint for level 3
      } else if (level === 2) {
        estimatedScore = 8; // Midpoint for level 2
      }

      setTotalScore(estimatedScore);
      setQuizCompleted(true);
    }
  }, []);

  const handleNext = () => {
    // Save the current answer
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    // Move to next question or finish quiz
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setValue(null); // Reset selection for next question
    } else {
      // Calculate score (A=1, B=2, C=3)
      const scoreValues = Object.values(newAnswers).map(val => val + 1); // Add 1 because index starts at 0
      const score = scoreValues.reduce((acc, val) => acc + val, 0);

      // Determine recommended level based on score
      let level = 1;
      if (score >= 10) {
        level = 3; // Level 3 - Live Well (Advanced) for 10-12 points
      } else if (score >= 7) {
        level = 2; // Level 2 - Know More (Intermediate) for 7-9 points
      } else {
        level = 1; // Level 1 - Start Strong (Basic) for 4-6 points
      }

      // Save user level to localStorage
      localStorage.setItem('userLevel', level.toString());

      setTotalScore(score);
      setRecommendedLevel(level);
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setValue(answers[currentQuestion - 1] || null);
    }
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  const restartQuiz = () => {
    // Clear the saved level from localStorage
    localStorage.removeItem('userLevel');

    setCurrentQuestion(0);
    setAnswers({});
    setValue(null);
    setQuizCompleted(false);
    setTotalScore(0);
  };

  const getLevelTitle = (level) => {
    switch (level) {
      case 1: return "Level 1 – Start Strong (Basic)";
      case 2: return "Level 2 – Know More (Intermediate)";
      case 3: return "Level 3 – Live Well (Advanced)";
      default: return "Level 1 – Start Strong (Basic)";
    }
  };

  const renderQuizContent = () => {
    if (quizCompleted) {
      return (
        <Result
          status="success"
          title="Assessment Complete!"
          subTitle={`We recommend: ${getLevelTitle(recommendedLevel)}`}
          extra={[
            <Button type="primary" key="restart" onClick={restartQuiz}>
              Retake Assessment
            </Button>
          ]}
        >
          <div className="result-details">
            <Paragraph>
              Your total score: {totalScore} points
            </Paragraph>
            <Paragraph>
              {recommendedLevel === 1 ? (
                'Level 1 focuses on building a strong foundation of financial and wellbeing knowledge.'
              ) : recommendedLevel === 2 ? (
                'Level 2 builds on basic knowledge and introduces more detailed concepts and strategies.'
              ) : (
                'Level 3 covers advanced topics for those who already have a solid understanding of the basics.'
              )}
            </Paragraph>
            <Paragraph>
              <Link to="/education">
                <Button type="link">
                  Begin My Learning Journey
                </Button>
              </Link>
            </Paragraph>
          </div>
        </Result>
      );
    }

    const question = quizQuestions[currentQuestion];
    const optionLabels = ['A', 'B', 'C']; // For displaying A, B, C before options

    return (
      <div>
        <div className="quiz-progress" >
          <Text className="quiz-progress-text">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </Text>

          <Progress
            percent={((currentQuestion + 1) / quizQuestions.length) * 100}
            showInfo={false}
            strokeColor="#FFC107"
          />
        </div>

        <Title level={4} className="quiz-question">
          {question.question}
        </Title>


        <Radio.Group onChange={handleChange} value={value} className="quiz-options">
          <Space direction="vertical">
            {question.options.map((option, index) => (
              <Radio key={index} value={index}>
                <Text strong>{optionLabels[index]}.</Text> {option}
              </Radio>
            ))}
          </Space>
        </Radio.Group>

        <div className="quiz-actions">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            type="primary"
            onClick={handleNext}
            disabled={value === null}
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="class-container" style={{ backgroundColor: 'var(--bg-color) '}}>
      <div className="quiz-container">
      <Title level={2} className="quiz-title">
        Safe and Settled Module Assessment Quiz
      </Title>
      {!quizCompleted && (
        <Paragraph className="quiz-description">
          Let's find the best place for you to begin your journey.
          <br />
          Answer the following {quizQuestions.length} questions. Your responses will help us match you with the right level.
        </Paragraph>
      )}
      <Card className="quiz-card">
        {renderQuizContent()}
      </Card>
    </div>
    </div>
    
  );
};

export default Quiz;
