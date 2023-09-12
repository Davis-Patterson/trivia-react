import { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from 'components/Categories';
import Questions from 'components/Questions';
import CatInputs from 'components/CatInputs';
import Footer from 'components/Footer';
import './App.css';
import QuesInputs from './components/QuesInputs';

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
  const lastQuesIdx = trivQuesData.length - 1;
  const catUrl = 'https://opentdb.com/api_category.php?';
  const baseUrl = 'https://opentdb.com/api.php?amount=10&';
  // const baseUrl = 'https://opentdb.com/api.php?amount=10&category=20&';

  function createUrl() {
    let url = `${baseUrl}amount=${quesNum}&`;

    if (selCat) {
      url += `category=${selCat.id}&`;
    }

    if (quesDiff) {
      url += `difficulty=${quesDiff}&`;
    }

    if (quesType) {
      url += `type=${quesType === 'multi' ? 'multiple' : 'boolean'}&`;
    }

    return url;
  }

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
      <header>
        <p className='triviaHeader'>Trivia!</p>
      </header>
      {hasSelCat ? (
        <Questions
          selCat={selCat}
          trivQuesData={trivQuesData}
          curQuesIdx={curQuesIdx}
          setCurQuesIdx={setCurQuesIdx}
        />
      ) : (
        <Categories trivCatData={trivCatData} handleCategory={handleCategory} />
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
        />
      )}
      <Footer />
    </>
  );
}

export default App;
