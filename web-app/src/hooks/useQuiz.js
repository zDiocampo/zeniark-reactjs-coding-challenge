import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionsData } from '../data/questions';

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadQuestions = useCallback(() => {
    try {
      const shuffledQuestions = questionsData.results
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
      setQuestions(shuffledQuestions);
      setLoading(false);
    } catch (error) {
      console.error("Error loading questions:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleAnswer = useCallback((answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      navigate("/results", {
        state: {
          answers: newAnswers,
          questions: questions,
        },
      });
    }
  }, [answers, currentQuestionIndex, questions.length, navigate]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setLoading(true);
    loadQuestions();
  }, [loadQuestions]);

  return {
    questions,
    currentQuestionIndex,
    answers,
    loading,
    handleAnswer,
    resetQuiz,
    currentQuestion: questions[currentQuestionIndex] || null,
  };
};
