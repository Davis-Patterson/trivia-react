const CatInputs = ({
  quesNum,
  handleInputChange,
  quesDiff,
  handleDiff,
  isCatInputs,
  setIsCatInputs,
}) => {
  const handleToggle = () => {
    setIsCatInputs(!isCatInputs);
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
                max={100}
                value={quesNum}
                onChange={handleInputChange}
                placeholder='1'
              />
            </div>
            <div className='diffSelect'>
              <select value={quesDiff} onChange={handleDiff}>
                <option value=''>--Choose Diffficulty--</option>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
              </select>
            </div>
          </div>
        </div>
      ) : null}
      <button className='toggleCatInputs' onClick={handleToggle}>
        Settings
      </button>
    </>
  );
};
export default CatInputs;
