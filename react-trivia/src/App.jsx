import { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from 'components/Categories';
import Questions from 'components/Questions';
import CatInputs from 'components/CatInputs';
import Footer from 'components/Footer';
import './App.css';

function App() {
  const [trivCatData, setTrivCatData] = useState([]);
  const [quesNum, setQuesNum] = useState(1);
  const [quesDiff, setQuesDiff] = useState('Easy');
  const [selCat, setSelCat] = useState(null);
  const [isCatInputs, setIsCatInputs] = useState(false);

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then((response) => setTrivCatData(response.data.trivia_categories));
  }, []);

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
      <CatInputs
        quesNum={quesNum}
        handleInputChange={handleInputChange}
        quesDiff={quesDiff}
        handleDiff={handleDiff}
        isCatInputs={isCatInputs}
        setIsCatInputs={setIsCatInputs}
      />
      {selCat ? (
        <Questions category={selCat} />
      ) : (
        <Categories trivCatData={trivCatData} handleCategory={handleCategory} />
      )}
      <Footer />
    </>
  );
}

export default App;
