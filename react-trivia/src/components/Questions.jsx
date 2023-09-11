import React from 'react';

function Questions({ category }) {
  return (
    <div>
      <h2>Selected Category: {category.name}</h2>
      {/* Add your questions rendering logic here */}
    </div>
  );
}

export default Questions;
