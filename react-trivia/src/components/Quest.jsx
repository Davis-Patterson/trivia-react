import React, { useState, useEffect } from 'react';
import { useQuestionContext } from 'components/QuesContxt';
import he from 'he';

const Quest = ({ ques, trivQuesData, showAns, setShowAns, curQuesIdx }) => {
  const { selChoi, setSelChoi, isCorrect, setIsCorrect } = useQuestionContext();
  const [allChoices, setAllChoices] = useState([]);

  const handleShow = (event) => {
    setShowAns(!showAns);
    event.stopPropagation();
  };

  const handleChoiClick = (choi, event) => {
    setSelChoi(choi);
    setIsCorrect(choi === ques.correct_answer); // CHECKS IF CORRECT
    const isAnsCor = choi === ques.correct_answer;
    event.stopPropagation();
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
                onClick={(event) => handleChoiClick(choi, event)}
              >
                {he.decode(choi)}
              </button>
            ))}
            {selChoi && isCorrect ? (
              <p className='correctMessage'>Correct!</p>
            ) : selChoi && isCorrect === false ? (
              <p className='incorrectMessage'>Incorrect :{'('}</p>
            ) : null}
          </div>
          {showAns ? (
            <p onClick={handleShow} className='answerTextShown'>
              {he.decode(ques.correct_answer)}
            </p>
          ) : (
            <p onClick={(event) => handleShow(event)} className='answerText'>
              ~ click for answer ~
            </p>
          )}
        </div>
      );
    } else {
      return (
        <div className='quesBox'>
          <div className='noQues'>No question data available</div>
        </div>
      );
    }
  } else {
    return;
  }
};
export default Quest;
