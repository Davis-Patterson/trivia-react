import arcadeImg from 'assets/arcade.png';

function Categories({ trivCatData, handleCategory }) {
  return (
    <div>
      <p className='categoriesText'>Categories</p>
      <div className='catContainer'>
        <div className='catBox'>
          <div className='shadow'>
            <img
              src={arcadeImg}
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
