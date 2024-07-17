import React, { useState } from 'react';
import './App.css';

const App = () => {
  const initialMatrix = Array(3).fill(Array(3).fill(''));
  const [matrix, setMatrix] = useState(initialMatrix);
  const [clickSequence, setClickSequence] = useState([]);

  const handleBoxClick = (row, col) => {
    if (matrix[row][col] === 'green') return;

    const newMatrix = matrix.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return 'green';
        }
        return cell;
      })
    );

    setMatrix(newMatrix);

    const newClickSequence = [...clickSequence, [row, col]];
    setClickSequence(newClickSequence);

    if (newClickSequence.length === 9) {
      changeAllToOrange(newClickSequence);
    }
  };

  const changeAllToOrange = (sequence) => {
    sequence.forEach(([row, col], index) => {
      setTimeout(() => {
        setMatrix((prevMatrix) =>
          prevMatrix.map((r, rowIndex) =>
            r.map((cell, colIndex) => {
              if (rowIndex === row && colIndex === col) {
                return 'orange';
              }
              return cell;
            })
          )
        );
      }, index * 500);
    });

    setTimeout(() => {
      resetMatrix();
    }, sequence.length * 500);
  };

  const resetMatrix = () => {
    setMatrix(initialMatrix);
    setClickSequence([]);
  };

  return (
    <div className="matrix-container">
      <div className="matrix">
        {matrix.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                className={`box ${cell}`}
                key={colIndex}
                onClick={() => handleBoxClick(rowIndex, colIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
