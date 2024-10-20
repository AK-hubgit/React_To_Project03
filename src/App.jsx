import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { React, useState } from "react";
import { WINNING_COMBINATIONS } from "./components/winningCombo";
import GameOver from "./components/GameOver";

const PLAYERS = { X: "Player1", O: "Player2" };

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

// 95.
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    /* console.log(WINNING_COMBINATIONS[0][0].column); //0 */
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[1].column];
    // 0 , 0
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

// 96.
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  // 95.
  const [players, setPlayers] = useState(PLAYERS);

  //  95.
  //  const [players, setPlayers] = useState({
  //   /*     'X' : 'Player1',
  //   'Y' : 'Player2' */
  //   X: "Player1",
  //   Y: "Player2",
  // });

  const [gameTurns, setGameTurns] = useState([]);

  function handleRestart() {
    setGameTurns([]);
  }
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = derivedActivePlayer(gameTurns);
  // 95.
  const gameBoard = deriveGameBoard(gameTurns);

  /* 95.   
  let gameBoard = [...inintialGameboard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  } */

  /*
    // 86 video.
    let currentPlayer = "X";
    if (prevTurns.length > 0 && prevTurns[0].player === "X") {
    currentPlayer = "O";
  } */

  const handleSelectSquare = (rowIndex, colIndex) => {
    /* setActivePlayer((curPlayer) => (curPlayer === "X" ? "O" : "X")); before.86.*/

    // storing values in object in a dynamic way with useState().
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      /* 
      // 86. commented
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      } */

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  /*  95.   
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    //  console.log(WINNING_COMBINATIONS[0][0].column); //0
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[1].column];
    // 0 , 0
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  } */

  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialname={PLAYERS.X}
            symbol="X"
            isSelect={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialname={PLAYERS.O}
            symbol="O"
            isSelect={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {/* {winner && <p>{winner} You won</p>}  90. */}
        {/* 91. */}
        {/* {winner && <GameOver winner={winner} />} */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

        <GameBoard
          onSelcted={handleSelectSquare}
          // activePlayerSymbol={activePlayer}
          /* turns={gameTurns} .86. */ board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
