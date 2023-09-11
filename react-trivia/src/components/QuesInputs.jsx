const QuesInputs = ({ setSelCat }) => {
  const handleBack = () => {
    setSelCat(null);
  };

  return (
    <>
      <button className='footer' onClick={handleBack}>
        ⬅Back
      </button>
    </>
  );
};
export default QuesInputs;
