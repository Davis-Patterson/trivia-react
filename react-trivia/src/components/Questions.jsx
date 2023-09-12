import React, { useState, useEffect } from 'react';
import arcadeImg from 'assets/arcade.png';

function Questions({ selCat, trivQuesData, curQuesIdx, setCurQuesIdx }) {
  const ques = trivQuesData[curQuesIdx];
  const [showAns, setShowAns] = useState(false);
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
    console.log(ques);
    if (trivQuesData.length > 0 && curQuesIdx < trivQuesData.length) {
      return (
        <div className='quesContainer'>
          {selCat ? <h2>{selCat.name}</h2> : <h2>{ques.category}</h2>}
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
                <p className='quesText'>{ques.question}</p>
              </div>
              <div className='choiceBox'>
                {allChoices.map((answer, index) => (
                  <button key={index}>{answer}</button>
                ))}
              </div>
              {showAns ? (
                <p onClick={handleShow}>{ques.correct_answer}</p>
              ) : (
                <p onClick={handleShow}>Click for answer!</p>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading questions...</div>;
    }
  } else {
    return <div>No question data available</div>;
  }
}

export default Questions;
