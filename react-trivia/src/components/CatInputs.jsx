const CatInputs = ({
  quesNum,
  handleInputChange,
  quesDiff,
  handleDiff,
  isCatInputs,
  setIsCatInputs,
}) => {
  return (
    <>
      <div>
        <div>
          <input
            type='number'
            className='goInput'
            name='Go'
            min='1'
            max={100}
            value={quesNum}
            onChange={handleInputChange}
            placeholder='1'
          />
          <label>How Many Questions do you want? </label>
        </div>
        <div>
          <select value={quesDiff} onChange={handleDiff}>
            <option value=''>--Choose Diffficulty--</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
      </div>
    </>
  );
};
export default CatInputs;
