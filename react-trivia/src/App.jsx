import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from 'components/Header';
import Categories from 'components/Categories';
import Questions from 'components/Questions';
import CatInputs from 'components/CatInputs';
import QuesInputs from './components/QuesInputs';
import ScoreInputs from './components/ScoreInputs';
import Footer from 'components/Footer';
import { useQuestionContext } from 'contexts/QuesContxt';
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
  const [hasSearched, setHasSearched] = useState(false); // triggers fetch for questions
  const [selCat, setSelCat] = useState(null); // actual category data
  const [isCatInputs, setIsCatInputs] = useState(false);
  const [trivQuesData, setTrivQuesData] = useState([]); // trivia question data
  const [curQuesIdx, setCurQuesIdx] = useState(initQuesIdx);
  const [showAns, setShowAns] = useState(false);
  const [curImgIdx, setCurImgIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPaused2, setIsPaused2] = useState(false);
  const [fade, setFade] = useState('fade-in');
  const lastQuesIdx = trivQuesData.length - 1;
  const catUrl = 'https://opentdb.com/api_category.php?';
  const baseUrl = 'https://opentdb.com/api.php?';
  const imageList = [arcadeImg, arcadeImg2, arcadeImg3, arcadeImg4, arcadeImg5];
  const { userAnswers, updateUserAnswers } = useQuestionContext();

  const isAllAnswered = trivQuesData.every((ques, index) => {
    const userAnswer = userAnswers[index];
    return userAnswer && userAnswer.selChoi !== '';
  });

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
    axios
      .get(catUrl)
      .then((response) => setTrivCatData(response.data.trivia_categories));
  }, []);

  useEffect(() => {
    if (hasSearched) {
      const url = createUrl();
      axios
        .get(url)
        .then((response) => setTrivQuesData(response.data.results))
        .catch((error) => console.error(`Error: ${error}`));
    }
  }, [hasSearched]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused && !isPaused2) {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          if (newProgress >= 100) {
            // If progress reaches 100, trigger 'fade-out' and reset progress
            setIsPaused2(true);
            setFade('fade-out');
            setTimeout(() => {
              setCurImgIdx((prevIndex) => (prevIndex + 1) % imageList.length);
              setProgress(0);
              setIsPaused2(false);
              setFade('fade-in');
            }, 500); // Delay time for 'fade-out', adjust as needed
          }
          return newProgress % 100;
        });
      }
    }, 60); // Adjust the interval time as needed

    return () => clearInterval(timer);
  }, [isPaused, isPaused2]);

  const pauseToggle = () => {
    setIsPaused(!isPaused);
  };

  const handleImgClick = () => {
    if (imageList) {
      setCurImgIdx((prevIndex) => (prevIndex + 1) % imageList.length);
      setProgress(0);
    }
  };

  const handleCategory = (trivCat, event) => {
    event.stopPropagation();
    if (trivCat === selCat) {
      setSelCat(null);
    } else {
      setSelCat(trivCat);
    }
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
      <Header
        trivQuesData={trivQuesData}
        hasSearched={hasSearched}
        setHasSearched={setHasSearched}
        setCurQuesIdx={setCurQuesIdx}
        setTrivQuesData={setTrivQuesData}
        setSelCat={setSelCat}
      />
      {hasSearched ? (
        <Questions
          selCat={selCat}
          trivQuesData={trivQuesData}
          curQuesIdx={curQuesIdx}
          showAns={showAns}
          setShowAns={setShowAns}
          curImgIdx={curImgIdx}
          imageList={imageList}
          handleImgClick={handleImgClick}
          progress={progress}
          setProgress={setProgress}
          fade={fade}
        />
      ) : (
        <Categories
          trivCatData={trivCatData}
          handleCategory={handleCategory}
          curImgIdx={curImgIdx}
          imageList={imageList}
          handleImgClick={handleImgClick}
          selCat={selCat}
          progress={progress}
          setProgress={setProgress}
          fade={fade}
        />
      )}
      {hasSearched ? (
        isAllAnswered ? (
          <ScoreInputs
            trivQuesData={trivQuesData}
            hasSearched={hasSearched}
            setHasSearched={setHasSearched}
            setCurQuesIdx={setCurQuesIdx}
            setTrivQuesData={setTrivQuesData}
            setSelCat={setSelCat}
            isPaused={isPaused}
            pauseToggle={pauseToggle}
          />
        ) : (
          <QuesInputs
            initQuesIdx={initQuesIdx}
            hasSearched={hasSearched}
            setHasSearched={setHasSearched}
            curQuesIdx={curQuesIdx}
            setCurQuesIdx={setCurQuesIdx}
            lastQuesIdx={lastQuesIdx}
            setTrivQuesData={setTrivQuesData}
            setSelCat={setSelCat}
            setShowAns={setShowAns}
            isPaused={isPaused}
            pauseToggle={pauseToggle}
          />
        )
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
          hasSearched={hasSearched}
          setHasSearched={setHasSearched}
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
