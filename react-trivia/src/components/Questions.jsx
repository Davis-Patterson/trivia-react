import React, { useState, useEffect } from 'react';
import arcadeImg from 'assets/arcade.png';
import he from 'he';

function Questions({ selCat, trivQuesData, curQuesIdx, showAns, setShowAns }) {
  const ques = trivQuesData[curQuesIdx];
  const [allChoices, setAllChoices] = useState([]);

  const handleShow = () => {
    setShowAns(!showAns);
  };

  useEffect(() => {
    if (ques) {
      let choicesAndAnswer = [ques.correct_answer, ...ques.incorrect_answers];
      setAllChoices(shuffleArray(choicesAndAnswer));
    }
  }, [ques]);

  console.log(`ques: ${ques}`);

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
        <div className='quesContainer'>
          <div className='catNameBox'>
            {selCat ? (
              <p className='catNameText'>{selCat.name}</p>
            ) : (
              <p className='catNameText'>{ques.category}</p>
            )}
            <p className='quesDiffText'>
              <strong>difficulty</strong>: <i>{ques.difficulty}</i>
            </p>
          </div>
          <div className='arcadeBox'>
            <div className='shadow'>
              <img
                src={arcadeImg}
                alt='Arcade Img'
                className='catBoxBanner'
              ></img>
            </div>
            <div className='quesBox'>
              <div className='textBox'>
                <p className='quesCount'>
                  Question {curQuesIdx + 1}/{trivQuesData.length}:
                </p>
                <p className='quesText'>{he.decode(ques.question)}</p>
              </div>
              <div className='choiceBox'>
                {allChoices.map((answer, index) => (
                  <button key={index}>{he.decode(answer)}</button>
                ))}
              </div>
              {showAns ? (
                <p onClick={handleShow} className='answerTextShown'>
                  {ques.correct_answer}
                </p>
              ) : (
                <p onClick={handleShow} className='answerText'>
                  ~ click for answer ~
                </p>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading questions...</div>;
    }
  } else {
    return (
      <div className='quesContainer'>
        <h2>Error</h2>
        <div className='arcadeBox'>
          <div className='shadow'>
            <img
              src={arcadeImg}
              alt='Arcade Img'
              className='catBoxBanner'
            ></img>
          </div>
          <div className='quesBox'>
            <div className='noQues'>No question data available</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Questions;
