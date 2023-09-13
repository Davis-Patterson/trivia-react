function Categories({
  trivCatData,
  handleCategory,
  curImgIdx,
  imageList,
  handleImgClick,
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
              className='catButton'
              key={trivCat.id}
              onClick={() => handleCategory(trivCat)}
            >
              <div className='catButtonText'>{trivCat.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
