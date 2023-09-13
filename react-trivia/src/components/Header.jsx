import bannerImg from 'assets/banner.png';
import icon from 'assets/icon.png';

const Header = ({ setHasSearched }) => {
  const handleClick = () => {
    setHasSearched(false);
  };

  return (
    <>
      <header>
        <img src={bannerImg} alt='Banner Img' className='headerBanner'></img>
        <p className='triviaHeader'>Trivia!</p>
        <img src={icon} alt='Icon' className='icon' onClick={handleClick}></img>
      </header>
    </>
  );
};
export default Header;
