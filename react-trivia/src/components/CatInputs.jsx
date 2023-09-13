const CatInputs = ({
  quesNum,
  handleInputChange,
  quesDiff,
  handleDiff,
  isCatInputs,
  setIsCatInputs,
  quesType,
  handleType,
  hasSearched,
  setHasSearched,
  setCurQuesIdx,
  isPaused,
  pauseToggle,
}) => {
  const handleToggle = () => {
    setIsCatInputs(!isCatInputs);
  };

  const handleCat = () => {
    setHasSearched(!hasSearched);
    setCurQuesIdx(0);
  };

  return (
    <>
      {isCatInputs ? (
        <div className='catInputContainer'>
          <div className='catInputBox'>
            <div className='numInputBox'>
              <label>Questions:</label>
              <input
                type='number'
                className='numInput'
                name='Go'
                min='1'
                max={50}
                value={quesNum}
                onChange={handleInputChange}
              />
            </div>
            <div className='diffSelect'>
              <select value={quesDiff} onChange={handleDiff}>
                <option value=''>Diffficulty</option>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
              </select>
            </div>
            <div className='typeSelect'>
              <select value={quesType} onChange={handleType}>
                <option value=''>Type</option>
                <option value='multi'>Multiple</option>
                <option value='tf'>True/False</option>
              </select>
            </div>
          </div>
        </div>
      ) : null}
      <button className='toggleCatInputs' onClick={handleToggle}>
        𝌆 Settings
      </button>
      <button className='toggleCatInputs' onClick={pauseToggle}>
        {isPaused ? '⏵︎ Play' : '⏸︎ Pause'}
      </button>
      <button className='toggleCatInputs' onClick={handleCat}>
        Search ⮕
      </button>
    </>
  );
};
export default CatInputs;
