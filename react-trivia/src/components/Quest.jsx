import React, { useState, useEffect } from 'react';
import he from 'he';

const Quest = ({ ques, trivQuesData, showAns, setShowAns, curQuesIdx }) => {
  const [allChoices, setAllChoices] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selChoi, setSelChoi] = useState('');

  const handleShow = () => {
    setShowAns(!showAns);
  };

  const handleChoiClick = (choi) => {
    setSelChoi(choi);
    setIsCorrect(choi === ques.correct_answer); // CHECKS IF CORRECT
  };

  useEffect(() => {
    if (ques) {
      let choicesAndAnswer = [ques.correct_answer, ...ques.incorrect_answers];
      setAllChoices(shuffleArray(choicesAndAnswer));
    }
  }, [ques]);

  function shuffleArray(array) {
    // fisher-yates shuffle algorithm modified to handle T/F questions differently
    if (
      array.length === 2 &&
      array.includes('True') &&
      array.includes('False')
    ) {
      return ['True', 'False'];
    }

    // if not T/F perform Fisher-Yates shuffle
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  if (ques) {
    if (trivQuesData.length > 0 && curQuesIdx < trivQuesData.length) {
      return (
        <div className='quesBox'>
          <div className='textBox'>
            <div className='quesInfoBox'>
              <p className='quesCount'>
                Question:{' '}
                <strong>
                  {curQuesIdx + 1}/{trivQuesData.length}
                </strong>
              </p>
              <p className='quesDiffText'>
                <strong>difficulty</strong>: <i>{ques.difficulty}</i>
              </p>
            </div>
            <p className='quesText'>{he.decode(ques.question)}</p>
          </div>
          <div className='choiceBox'>
            {allChoices.map((choi, index) => (
              <button
                key={index}
                className={`choiceButton ${
                  selChoi === choi ? 'selected' : ''
                } ${isCorrect === true ? 'correct' : ''} ${
                  isCorrect === false ? 'incorrect' : ''
                }`}
                onClick={() => handleChoiClick(choi)}
              >
                {he.decode(choi)}
              </button>
            ))}
            {selChoi && isCorrect ? (
              <p className='message'>Correct!</p>
            ) : selChoi && isCorrect === false ? (
              <p className='message'>Incorrect!</p>
            ) : null}
          </div>
          {showAns ? (
            <p onClick={handleShow} className='answerTextShown'>
              {he.decode(ques.correct_answer)}
            </p>
          ) : (
            <p onClick={handleShow} className='answerText'>
              ~ click for answer ~
            </p>
          )}
        </div>
      );
    } else {
      return;
    }
  } else {
    return (
      <div className='quesBox'>
        <div className='noQues'>No question data available</div>
      </div>
    );
  }
};
export default Quest;