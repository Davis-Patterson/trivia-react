import React, { createContext, useContext, useState, useEffect } from 'react';

const QuesContxt = createContext();

export function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]); // Store user answers as an array of objects

  useEffect(() => {
    // Initialize userAnswers with default state for each question
    setUserAnswers(
      Array(questions.length).fill({ selChoi: '', isCorrect: null })
    );
  }, [questions]);

  const updateUserAnswers = (questionIndex, answer) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = answer;
      return updatedAnswers;
    });
  };

  return (
    <QuesContxt.Provider
      value={{
        questions,
        setQuestions,
        userAnswers,
        updateUserAnswers,
      }}
    >
      {children}
    </QuesContxt.Provider>
  );
}

export function useQuestionContext() {
  return useContext(QuesContxt);
}
