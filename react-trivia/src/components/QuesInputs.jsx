const QuesInputs = ({
  initQuesIdx,
  hasSelCat,
  setHasSelCat,
  curQuesIdx,
  setCurQuesIdx,
  lastQuesIdx,
  setTrivQuesData,
  setSelCat,
  setShowAns,
  isPaused,
  pauseToggle,
}) => {
  const handleCat = () => {
    setHasSelCat(!hasSelCat);
    setCurQuesIdx(0);
    setTrivQuesData([]);
    setSelCat(null);
  };

  const handleBack = () => {
    setCurQuesIdx(curQuesIdx - 1);
    setShowAns(false);
  };

  const handleNext = () => {
    setCurQuesIdx(curQuesIdx + 1);
    setShowAns(false);
  };

  return (
    <>
      <button onClick={handleCat}>𝌆 Categories</button>
      <button className='toggleCatInputs' onClick={pauseToggle}>
        {isPaused ? '⏵︎ Play' : '⏸︎ Pause'}
      </button>
      <button onClick={handleBack} disabled={curQuesIdx === initQuesIdx}>
        ⬅Back
      </button>
      <button onClick={handleNext} disabled={curQuesIdx === lastQuesIdx}>
        Next⮕
      </button>
    </>
  );
};
export default QuesInputs;
