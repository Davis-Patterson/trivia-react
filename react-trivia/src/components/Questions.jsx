import { useState } from 'react';

function Questions({ category, trivQuesData, curQuesIdx, setCurQuesIdx }) {
  const ques = trivQuesData[curQuesIdx];

  if (ques) {
    let choicesAndAnswer = [ques.correct_answer, ...ques.incorrect_answers];

    function shuffleArray(array) {
      // fisher-yates shuffle algorithm modified to handle T/F questions differently
      if (
        array.length === 2 &&
        array.includes('True') &&
        array.includes('False')
      ) {
        return ['True', 'False'];
      }

      // if not T/F perform Fisher-Yates shuffle
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;

      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    const allChoices = shuffleArray(choicesAndAnswer);
    console.log(ques);
    if (trivQuesData.length > 0 && curQuesIdx < trivQuesData.length) {
      return (
        <div>
          <h2>Category: {category.name}</h2>
          <p>{ques.question}</p>
          <ul>
            {allChoices.map((answer, index) => (
              <li key={index}>{answer}</li>
            ))}
          </ul>
          <p>Answer: {ques.correct_answer}</p>
        </div>
      );
    } else {
      return <div>Loading questions...</div>;
    }
  }
}

export default Questions;
