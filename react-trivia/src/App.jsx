import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from 'components/Header';
import Categories from 'components/Categories';
import Questions from 'components/Questions';
import CatInputs from 'components/CatInputs';
import QuesInputs from './components/QuesInputs';
import Footer from 'components/Footer';
import arcadeImg from 'assets/arcade.png';
import arcadeImg2 from 'assets/arcade2.png';
import arcadeImg3 from 'assets/arcade3.png';
import arcadeImg4 from 'assets/arcade4.png';
import arcadeImg5 from 'assets/arcade5.png';
import './App.css';

function App() {
  const initQuesIdx = 0;
  const [trivCatData, setTrivCatData] = useState([]);
  const [quesNum, setQuesNum] = useState(10);
  const [quesDiff, setQuesDiff] = useState('');
  const [quesType, setQuesType] = useState('');
  const [hasSelCat, setHasSelCat] = useState(false); // triggers fetch for questions
  const [selCat, setSelCat] = useState(null); // actual category data
  const [isCatInputs, setIsCatInputs] = useState(false);
  const [trivQuesData, setTrivQuesData] = useState([]); // trivia question data
  const [curQuesIdx, setCurQuesIdx] = useState(initQuesIdx);
  const [showAns, setShowAns] = useState(false);
  const [curImgIdx, setCurImgIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const lastQuesIdx = trivQuesData.length - 1;
  const catUrl = 'https://opentdb.com/api_category.php?';
  const baseUrl = 'https://opentdb.com/api.php?';
  const imageList = [arcadeImg, arcadeImg2, arcadeImg3, arcadeImg4, arcadeImg5];

  function createUrl() {
    let url = `${baseUrl}amount=${quesNum}`;

    if (selCat) {
      url += `&category=${selCat.id}`;
    }

    if (quesDiff) {
      url += `&difficulty=${quesDiff}`;
    }

    if (quesType) {
      url += `&type=${quesType === 'multi' ? 'multiple' : 'boolean'}`;
    }

    return url;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          if (newProgress >= 100) {
            setCurImgIdx((prevIndex) => (prevIndex + 1) % imageList.length);
          }
          return newProgress % 100;
        });
      }
    }, 60);

    return () => clearInterval(timer);
  }, [isPaused]);

  const pauseToggle = () => {
    setIsPaused(!isPaused);
  };

  console.log(progress);

  useEffect(() => {
    axios
      .get(catUrl)
      .then((response) => setTrivCatData(response.data.trivia_categories));
  }, []);

  useEffect(() => {
    if (hasSelCat) {
      const url = createUrl();
      axios
        .get(url)
        .then((response) => setTrivQuesData(response.data.results))
        .catch((error) => console.error(`Error: ${error}`));
    }
  }, [hasSelCat]);

  const handleCategory = (trivCat) => {
    setHasSelCat(!hasSelCat);
    setSelCat(trivCat);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuesNum(value);
  };

  const handleDiff = (event) => {
    const value = event.target.value;
    setQuesDiff(value);
  };

  const handleType = (event) => {
    const value = event.target.value;
    setQuesType(value);
  };

  return (
    <>
      <Header setHasSelCat={setHasSelCat} />
      {hasSelCat ? (
        <Questions
          selCat={selCat}
          trivQuesData={trivQuesData}
          curQuesIdx={curQuesIdx}
          showAns={showAns}
          setShowAns={setShowAns}
          curImgIdx={curImgIdx}
          imageList={imageList}
        />
      ) : (
        <Categories
          trivCatData={trivCatData}
          handleCategory={handleCategory}
          curImgIdx={curImgIdx}
          imageList={imageList}
        />
      )}
      {hasSelCat ? (
        <QuesInputs
          initQuesIdx={initQuesIdx}
          hasSelCat={hasSelCat}
          setHasSelCat={setHasSelCat}
          curQuesIdx={curQuesIdx}
          setCurQuesIdx={setCurQuesIdx}
          lastQuesIdx={lastQuesIdx}
          setTrivQuesData={setTrivQuesData}
          setSelCat={setSelCat}
          setShowAns={setShowAns}
          isPaused={isPaused}
          pauseToggle={pauseToggle}
        />
      ) : (
        <CatInputs
          quesNum={quesNum}
          handleInputChange={handleInputChange}
          quesDiff={quesDiff}
          handleDiff={handleDiff}
          isCatInputs={isCatInputs}
          setIsCatInputs={setIsCatInputs}
          quesType={quesType}
          handleType={handleType}
          hasSelCat={hasSelCat}
          setHasSelCat={setHasSelCat}
          setCurQuesIdx={setCurQuesIdx}
          isPaused={isPaused}
          pauseToggle={pauseToggle}
        />
      )}
      <Footer />
    </>
  );
}

export default App;
