import { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from 'components/Categories';
import Questions from 'components/Questions';
import './App.css';

function App() {
  const [trivCatData, setTrivCatData] = useState([]);
  const [selCat, setSelCat] = useState(null);

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then((response) => setTrivCatData(response.data.trivia_categories));
  }, []);

  const handleCategory = (trivCat) => {
    setSelCat(trivCat);
  };

  return (
    <>
      <header>
        <p className='triviaHeader'>Trivia!</p>
      </header>
      {selCat ? (
        <Questions category={selCat} />
      ) : (
        <Categories trivCatData={trivCatData} handleCategory={handleCategory} />
      )}
    </>
  );
}

export default App;
