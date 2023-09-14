import bannerImg from 'assets/banner.png';
import icon from 'assets/icon.png';
import { useQuestionContext } from 'contexts/QuesContxt';

const Header = ({
  trivQuesData,
  hasSearched,
  setHasSearched,
  setCurQuesIdx,
  setTrivQuesData,
  setSelCat,
}) => {
  const { resetUserAnswers } = useQuestionContext();

  const handleClick = () => {
    resetUserAnswers();
    setHasSearched(!hasSearched);
    setCurQuesIdx(0);
    setTrivQuesData([]);
    setSelCat(null);
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
