import React, { useState, useEffect } from 'react';
import Quest from 'components/Quest';
import { all } from 'axios';

function Questions({
  selCat,
  trivQuesData,
  curQuesIdx,
  showAns,
  setShowAns,
  currentImageIndex,
  imageList,
  isCorrect,
  setIsCorrect,
}) {
  const [allChoices, setAllChoices] = useState([]);

  if (trivQuesData) {
    if (trivQuesData.length > 0 && curQuesIdx < trivQuesData.length) {
      return (
        <div className='quesContainer'>
          <div className='catNameBox'>
            {selCat ? (
              <p className='catNameText'>{selCat.name}</p>
            ) : (
              <p className='catNameText'>{ques.category}</p>
            )}
            {selCat ? (
              <p className='catRandText'>
                <strong>category</strong>: <i>set</i>
              </p>
            ) : (
              <p className='catRandText'>
                <strong>category</strong>: <i>random</i>
              </p>
            )}
          </div>
          <div className='arcadeBox'>
            <div className='shadow'>
              <img
                src={`${imageList[currentImageIndex]}`}
                alt='Arcade Img'
                className='catBoxBanner'
              ></img>
            </div>
            {trivQuesData.map(
              (ques, index) =>
                curQuesIdx === index && (
                  <Quest
                    key={index}
                    ques={ques}
                    trivQuesData={trivQuesData}
                    showAns={showAns}
                    setShowAns={setShowAns}
                    curQuesIdx={curQuesIdx}
                  />
                )
            )}
          </div>
        </div>
      );
    } else {
      return;
    }
  } else {
    return (
      <div className='quesContainer'>
        <h2>Error</h2>
        <div className='arcadeBox'>
          <div className='shadow'>
            <img
              src={`${imageList[currentImageIndex]}`}
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
