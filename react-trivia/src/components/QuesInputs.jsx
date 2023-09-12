const QuesInputs = ({
  initQuesIdx,
  hasSelCat,
  setHasSelCat,
  curQuesIdx,
  setCurQuesIdx,
  lastQuesIdx,
  setTrivQuesData,
  setSelCat,
}) => {
  const handleCat = () => {
    setHasSelCat(!hasSelCat);
    setCurQuesIdx(0);
    setTrivQuesData([]);
    setSelCat(null);
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
