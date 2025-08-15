import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png';

export default function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { answers, questions } = location.state || { answers: [], questions: [] }

  // ---------------------------decode HTML entities remove &quot fetched from db;---------------------------
  const cleanText = (text) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  // ---------------------------Calculate score---------------------------
  const correctAnswers = answers.filter((answer, index) => 
    answer === questions[index]?.correct_answer
  ).length
  const totalQuestions = questions.length
  const score = `${correctAnswers}/${totalQuestions}`

  const handlePlayAgain = () => {
    navigate('/')
  }

  // If no data, redirect to home
  if (!answers.length || !questions.length) {
    navigate('/')
    return null
  }

  return (
    <div className="page page-results">
      <div className="page-content">
        <div className="results-card">
          <div className="results-header">
            <img src={logo} alt="Logo" className="results-logo" />
            <h1 className="results-title">Final Results</h1>
          </div>
          
          <div className="score-display">
            <div className="score-number">{score}</div>
            <div className="score-label">Your Score</div>
          </div>
          
          <div className="questions-list">
            {questions.map((question, index) => {
              const userAnswer = answers[index]
              const isCorrect = userAnswer === question.correct_answer
              
              return (
                <div key={index} className="question-item">
                  <div className="question-header">
                    <span className="question-number">{index + 1}.</span>
                    <span className="question-text">{cleanText(question.question)}</span>
                  </div>
                  
                  <div className="answer-feedback">
                    <div className="feedback-line">
                      The correct answer is{' '}
                      <span className={`answer-text ${question.correct_answer === 'True' ? 'correct' : 'incorrect'}`}>
                        {question.correct_answer}
                      </span>
                      .
                    </div>
                    <div className="feedback-line">
                      You answered{' '}
                      <span className={`answer-text ${userAnswer === 'True' ? 'correct' : 'incorrect'}`}>
                        {userAnswer}
                      </span>
                      .
                    </div>
                  </div>
                  
                  <div className="result-indicator">
                    {isCorrect ? (
                      <span className="indicator correct">✓</span>
                    ) : (
                      <span className="indicator incorrect">✗</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="play-again-section">
            <button className="play-again-btn" onClick={handlePlayAgain}>
              PLAY AGAIN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
