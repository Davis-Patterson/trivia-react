import React, { createContext, useContext, useState } from 'react';

const QuesContxt = createContext();

export function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [selChoi, setSelChoi] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const updateUserAnswers = (questionIndex, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  return (
    <QuesContxt.Provider
      value={{
        questions,
        setQuestions,
        userAnswers,
        updateUserAnswers,
        selChoi,
        setSelChoi,
        isCorrect,
        setIsCorrect,
      }}
    >
      {children}
    </QuesContxt.Provider>
  );
}

export function useQuestionContext() {
  return useContext(QuesContxt);
}
