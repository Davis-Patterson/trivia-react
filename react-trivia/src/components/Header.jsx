import bannerImg from 'assets/banner.png';

const Header = () => {
  return (
    <>
      <header>
        <img src={bannerImg} alt='Banner Img' className='headerBanner'></img>
        <p className='triviaHeader'>Trivia!</p>
      </header>
    </>
  );
};
export default Header;
