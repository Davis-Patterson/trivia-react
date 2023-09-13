import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Quest from 'components/Quest';
import { all } from 'axios';

function Questions({
  selCat,
  trivQuesData,
  curQuesIdx,
  showAns,
  setShowAns,
  curImgIdx,
  imageList,
  isCorrect,
  setIsCorrect,
  handleImgClick,
}) {
  const [allChoices, setAllChoices] = useState([]);

  const ques = trivQuesData[curQuesIdx];

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
          <div className='arcadeBox' onClick={handleImgClick}>
            <div className='shadow'>
              <img
                src={`${imageList[curImgIdx]}`}
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
      return (
        <div className='quesContainer'>
          <h2>loading...</h2>
          <div className='arcadeBox' onClick={handleImgClick}>
            <div className='shadow'>
              <img
                src={`${imageList[curImgIdx]}`}
                alt='Arcade Img'
                className='catBoxBanner'
              ></img>
            </div>
            <div className='quesBox'>
              <div className='noQues'>
                <Skeleton count={5} height={50} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return;
  }
}

export default Questions;
