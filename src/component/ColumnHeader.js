import React from 'react';

const ColumnHeader = ({ title, cardCount, markCompletion }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>Card Count: {cardCount}</p>
      <button onClick={markCompletion}>Mark as Completion</button>
    </div>
  );
};

export default ColumnHeader;
