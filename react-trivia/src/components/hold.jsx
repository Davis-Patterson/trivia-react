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
          src={`${imageList[curImgIdx]}`}
          alt='Arcade Img'
          className='catBoxBanner'
        ></img>
      </div>
      <Quest
        trivQuesData={trivQuesData}
        showAns={showAns}
        setShowAns={setShowAns}
        curQuesIdx={curQuesIdx}
      />
    </div>
  </div>
);
