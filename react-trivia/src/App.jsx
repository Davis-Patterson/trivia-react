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
  const [quesNum, setQuesNum] = useState(1);
  const [quesDiff, setQuesDiff] = useState('Easy');
  const [selCat, setSelCat] = useState(null);
  const [isCatInputs, setIsCatInputs] = useState(false);
  const [trivQuesData, setTrivQuesData] = useState([]);
  const [curQuesIdx, setCurQuesIdx] = useState(initQuesIdx);
  const lastQuesIdx = trivQuesData.length - 1;
  const catUrl = 'https://opentdb.com/api_category.php?';
  // const baseUrl = 'https://opentdb.com/api.php?amount=10&';
  const baseUrl = 'https://opentdb.com/api.php?amount=10&category=20&';

  useEffect(() => {
    axios
      .get(catUrl)
      .then((response) => setTrivCatData(response.data.trivia_categories));
  }, []);

  useEffect(() => {
    if (selCat) {
      axios
        .get(baseUrl)
        .then((response) => setTrivQuesData(response.data.results))
        .catch((error) => console.error(`Error: ${error}`));
    }
  }, [selCat]);

  const handleCategory = (trivCat) => {
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

  return (
    <>
      <header>
        <p className='triviaHeader'>Trivia!</p>
      </header>
      {selCat ? (
        <Questions
          category={selCat}
          trivQuesData={trivQuesData}
          curQuesIdx={curQuesIdx}
          setCurQuesIdx={setCurQuesIdx}
        />
      ) : (
        <Categories trivCatData={trivCatData} handleCategory={handleCategory} />
      )}
      {selCat ? (
        <QuesInputs
          initQuesIdx={initQuesIdx}
          setSelCat={setSelCat}
          curQuesIdx={curQuesIdx}
          setCurQuesIdx={setCurQuesIdx}
          lastQuesIdx={lastQuesIdx}
        />
      ) : (
        <CatInputs
          quesNum={quesNum}
          handleInputChange={handleInputChange}
          quesDiff={quesDiff}
          handleDiff={handleDiff}
          isCatInputs={isCatInputs}
          setIsCatInputs={setIsCatInputs}
        />
      )}
      <Footer />
    </>
  );
}

export default App;
