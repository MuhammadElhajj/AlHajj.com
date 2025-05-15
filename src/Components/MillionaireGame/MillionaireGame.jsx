import React, { useState, useEffect } from 'react';
import questions from './questions.json';
import './MillionaireGame.css';

const MILLIONAIRE_QUESTIONS = 10;
const PRIZE_PER_QUESTION = 1000;

const MillionaireGame = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [prize, setPrize] = useState(0);
  const [settings, setSettings] = useState({
    language: 'ar',
    theme: 'dark',
    showSettings: false
  });
  const [highScore, setHighScore] = useState({ score: 0, date: '' });

  // Initialize game
  useEffect(() => {
    const savedScore = localStorage.getItem('millionaireHighScore');
    if (savedScore) setHighScore(JSON.parse(savedScore));
    
    const randomQuestions = shuffleArray(questions).slice(0, MILLIONAIRE_QUESTIONS);
    setShuffledQuestions(randomQuestions);
  }, []);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    const correctIndex = shuffledQuestions[currentQuestion].correct;

    if (index === correctIndex) {
      setTimeout(() => {
        if (currentQuestion === shuffledQuestions.length - 1) {
          endGame(true);
        } else {
          goToNextQuestion();
        }
      }, 2000);
    } else {
      setTimeout(() => endGame(false), 2000);
    }
  };

  const goToNextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
    setSelectedAnswer(null);
    setPrize(prev => prev + PRIZE_PER_QUESTION);
  };

  const endGame = (won) => {
    const finalPrize = won ? prize + PRIZE_PER_QUESTION : Math.floor(prize / 2);
    setGameOver(true);
    setPrize(finalPrize);
    
    // Update high score if current score is better
    if (finalPrize > highScore.score) {
      const newScore = {
        date: new Date().toISOString(),
        score: finalPrize,
        correctAnswers: currentQuestion + (won ? 1 : 0)
      };
      
      setHighScore(newScore);
      localStorage.setItem('millionaireHighScore', JSON.stringify(newScore));
    }
  };

  const toggleSettings = () => {
    setSettings(prev => ({ ...prev, showSettings: !prev.showSettings }));
  };

  const changeLanguage = (lang) => {
    setSettings(prev => ({ ...prev, language: lang }));
  };

  const changeTheme = (theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setGameOver(false);
    setPrize(0);
    setShuffledQuestions(shuffleArray(questions).slice(0, MILLIONAIRE_QUESTIONS));
  };

  if (!shuffledQuestions.length) return <div>Loading...</div>;

  return (
    <div className={`game-container ${settings.theme}-theme`}>
      <button className="settings-button" onClick={toggleSettings}>
        {settings.language === 'ar' ? 'الإعدادات' : 'Settings'}
      </button>

      <div className="score-board">
        {settings.language === 'ar' ? 'النتيجة: ' : 'Score: '}
        {prize} {settings.language === 'ar' ? 'ريال' : 'SAR'}
      </div>

      {settings.showSettings && (
        <div className="settings-modal">
          <h3>{settings.language === 'ar' ? 'الإعدادات' : 'Settings'}</h3>
          
          <div>
            <label>{settings.language === 'ar' ? 'اللغة:' : 'Language:'}</label>
            <select 
              value={settings.language}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label>{settings.language === 'ar' ? 'السمة:' : 'Theme:'}</label>
            <select
              value={settings.theme}
              onChange={(e) => changeTheme(e.target.value)}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="blue">Blue</option>
            </select>
          </div>
        </div>
      )}

      {!gameOver ? (
        <>
          <div className="question-box">
            <h2>{shuffledQuestions[currentQuestion].question}</h2>
            
            {shuffledQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswer !== null && 
                  index === shuffledQuestions[currentQuestion].correct 
                    ? 'option-correct' 
                    : selectedAnswer === index 
                    ? 'option-wrong' 
                    : 'option-default'
                }`}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="prize-ladder">
            {shuffledQuestions.map((_, i) => (
              <div 
                key={i} 
                style={{ 
                  color: currentQuestion === i ? '#FFD700' : 'inherit',
                  fontWeight: currentQuestion === i ? 'bold' : 'normal'
                }}
              >
                {(i + 1) * PRIZE_PER_QUESTION} {settings.language === 'ar' ? 'ريال' : 'SAR'}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="end-screen">
          <h2>{settings.language === 'ar' ? 'انتهت اللعبة!' : 'Game Over!'}</h2>
          <p>
            {settings.language === 'ar' ? 'عدد الإجابات الصحيحة: ' : 'Correct Answers: '}
            {Math.floor(prize / PRIZE_PER_QUESTION)}
          </p>
          <p>
            {settings.language === 'ar' ? 'النتيجة النهائية: ' : 'Final Score: '}
            {prize} {settings.language === 'ar' ? 'ريال' : 'SAR'}
          </p>
          
          <button className='Play__Again__Button' onClick={resetGame}>
            {settings.language === 'ar' ? 'العب مرة أخرى' : 'Play Again'}
          </button>

          <div className="high-score">
            <h3>{settings.language === 'ar' ? 'أفضل نتيجة' : 'Best Score'}</h3>
            {highScore.score > 0 ? (
              <div>
                <div>{highScore.score} {settings.language === 'ar' ? 'ريال' : 'SAR'}</div>
                <small>
                  {settings.language === 'ar' ? 'بتاريخ: ' : 'Date: '}
                  {new Date(highScore.date).toLocaleDateString()}
                </small>
              </div>
            ) : (
              <div>{settings.language === 'ar' ? 'لا توجد نتائج مسجلة' : 'No scores recorded'}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MillionaireGame;