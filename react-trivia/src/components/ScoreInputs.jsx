import { useQuestionContext } from 'contexts/QuesContxt';

const ScoreInputs = ({
  hasSearched,
  setHasSearched,
  setCurQuesIdx,
  setTrivQuesData,
  setSelCat,
  isPaused,
  pauseToggle,
}) => {
  const { resetUserAnswers } = useQuestionContext();

  const handleCat = () => {
    resetUserAnswers(); // Clear user's previous answers
    setHasSearched(!hasSearched);
    setCurQuesIdx(0);
    setTrivQuesData([]);
    setSelCat(null);
  };

  return (
    <>
      <button onClick={handleCat}>𝌆 Categories</button>
      <button className='toggleCatInputs' onClick={pauseToggle}>
        {isPaused ? '⏵︎ Play' : '⏸︎ Pause'}
      </button>
    </>
  );
};

export default ScoreInputs;
