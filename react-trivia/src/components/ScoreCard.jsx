import React, { useContext } from 'react';
import { useQuestionContext } from 'contexts/QuesContxt';
import he from 'he';

const ScoreCard = ({ trivQuesData }) => {
  const { userAnswers } = useQuestionContext();

  const totalQuestions = trivQuesData.length;
  const correctAnswers = userAnswers.filter(
    (answer) => answer.isCorrect
  ).length;
  const percentageScore = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className='quesBox'>
      <div className='textBox'>
        <p className='scoreText'>Score Card:</p>
        <p className='percentage'>{percentageScore}%</p>
        <p className='scoreInfo'>
          {correctAnswers} out of {totalQuestions} questions answered correctly
        </p>
        <div className='questionDetails'>
          {trivQuesData.map((ques, index) => {
            const userAnswer = userAnswers[index]?.selChoi;
            const correctAnswer = ques.correct_answer;
            const isCorrect = userAnswer === correctAnswer;
            const resultMessage = isCorrect ? 'Correct' : 'Incorrect';

            return (
              <div
                key={index}
                className={`questionDetail ${
                  isCorrect ? 'correct' : 'incorrect'
                }`}
              >
                <p className='questionsText'>
                  <strong>Question {index + 1}:</strong>{' '}
                  {he.decode(ques.question)}
                </p>
                <div className='answeredBox'>
                  <p className='answeredText'>
                    <strong>Answered:</strong> {userAnswer || 'Not answered'}
                  </p>
                  <p className='correctText'>
                    <strong>Correct:</strong> {he.decode(correctAnswer)}
                  </p>
                </div>
                <p className={isCorrect ? 'resultCorrect' : 'resultIncorrect'}>
                  <strong>{resultMessage}</strong>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
