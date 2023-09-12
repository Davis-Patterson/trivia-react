const QuesInputs = ({
  initQuesIdx,
  setSelCat,
  curQuesIdx,
  setCurQuesIdx,
  lastQuesIdx,
}) => {
  const handleCat = () => {
    setSelCat(null);
    setCurQuesIdx(0);
  };

  return (
    <>
      <button onClick={handleCat}>≡ Categories</button>
      <button
        onClick={() => setCurQuesIdx(curQuesIdx - 1)}
        disabled={curQuesIdx === initQuesIdx}
      >
        ⬅Back
      </button>
      <button
        onClick={() => setCurQuesIdx(curQuesIdx + 1)}
        disabled={curQuesIdx === lastQuesIdx}
      >
        Next⮕
      </button>
    </>
  );
};
export default QuesInputs;
