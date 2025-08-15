import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import zeniarkLogo from "../images/logo.png";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

   // ---------------------------decode HTML entities remove &quot fetched from db;---------------------------
  const cleanText = (text) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/questions');
      const data = await response.json();
      
      // data is already the questions array, no need for data[0].results
      const questionsArray = data;
      
      // ---------------------------randomize and take first 10 questions---------------------------
      const shuffledQuestions = questionsArray
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
      
      setQuestions(shuffledQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers); 

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // ---------------------------quiz completed, navigate to results---------------------------
      navigate("/results", {
        state: {
          answers: newAnswers,
          questions: questions,
        },
      });
    }
  };

  // ---------------------------show loading state---------------------------
  if (questions.length === 0) {
    return (
      <div className="page page-quiz">
        <div className="page-content">
          <div className="quiz-card">
            <div className="loading">Loading questions...</div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="page page-quiz">
      <div className="question-counter">
      </div>
      <div className="page-content">
        <div className="quiz-card">
          <div className="quiz-header">
            <div className="category-section">
              <img
                src={zeniarkLogo}
                alt="Zeniark Logo"
                className="category-logo"
              />
              <span className="category-text">
                Category: {currentQuestion.category}
              </span>
            </div>
            <div className="question-counter-text">
              {currentQuestionIndex + 1} of 10
            </div>
          </div>

          <div className="question-content">
            <div className="question-text">{cleanText(currentQuestion.question)}</div>
          </div>

          <div className="answer-buttons">
            <button
              className="answer-btn answer-true"
              onClick={() => handleAnswer("True")}
            >
              <span className="btn-icon">✓</span>
              <span className="btn-text">True</span>
            </button>
            <button
              className="answer-btn answer-false"
              onClick={() => handleAnswer("False")}
            >
              <span className="btn-icon">✗</span>
              <span className="btn-text">False</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
