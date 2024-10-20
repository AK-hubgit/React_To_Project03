// import { useState } from "react";

export default function GameBoard({ onSelcted, board }) {
  /*   let gameBoard = inintialGameboard;
  const board = gameBoard; */

  // const [gameBoard, setGameBoard] = useState(inintialGameboard);
  // const handleSelectSquare = (rowIndex, colIndex) => {
  //   setGameBoard((prevBoard) => {
  //     const updateBoard = [...prevBoard.map((innerArray) => [...innerArray])];
  //     updateBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updateBoard;
  //   });
  //   onSelcted();
  // };

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* <button onClick={() => handleSelectSquare(rowIndex, colIndex)}> */}
                <button
                  onClick={() => onSelcted(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

// to Replacing this hard core X O list with buttons
{
  /*  <li>
        <ol>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </li>
      <li>
        <ol>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </li>
      <li>
        <ol>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </li> */
}
