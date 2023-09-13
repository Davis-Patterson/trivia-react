import Progress from 'components/Progress';

function Categories({
  trivCatData,
  handleCategory,
  curImgIdx,
  imageList,
  handleImgClick,
  selCat,
  progress,
  setProgress,
}) {
  return (
    <div>
      <p className='categoriesText'>Categories</p>
      <div className='catContainer'>
        <div className='arcadeBox' onClick={handleImgClick}>
          <div className='shadow'>
            <img
              src={`${imageList[curImgIdx]}`}
              alt='Arcade Img'
              className='catBoxBanner'
            ></img>
          </div>
          {trivCatData.map((trivCat) => (
            <button
              className={`catButton ${trivCat === selCat ? 'selected' : ''}`}
              key={trivCat.id}
              onClick={() => handleCategory(trivCat)}
            >
              <div className='catButtonText'>{trivCat.name}</div>
            </button>
          ))}
          <Progress progress={progress} setProgress={setProgress} />
        </div>
      </div>
    </div>
  );
}

export default Categories;
