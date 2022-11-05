import React, { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import './fonts.css';
import './App.css';
import { getWinner } from "./utils";
import Board from "./Board";
import Banner from "./Banner";
import type { SquareType } from "./types";

function App() {
  const [boardSize, setBoardSize] = useState(!Number.isNaN(parseInt(localStorage.getItem("boardSize") as string)) ? parseInt(localStorage.getItem("boardSize") as string) : 9);
  const [squares, setSquares] = useState(localStorage.getItem("squares") ? JSON.parse(localStorage.getItem("squares") || "[]") : Array(boardSize).fill(null));
  const [playerTurn, setPlayerTurn] = useState(localStorage.getItem("playerTurn") || "X");
  const [winner, setWinner] = useState(localStorage.getItem("winner") || null);

  const handleBoardSize = (i: number) => {
    if (!Number.isInteger(Math.sqrt(i))) return;
    setBoardSize(i);
    setSquares(Array(i).fill(null));
    localStorage.setItem("boardSize", JSON.stringify(i));
    localStorage.removeItem("squares");
    localStorage.removeItem("playerTurn");
    localStorage.removeItem("winner");
  };

  const handleSquareClick = (i: number) => {
    const winner = getWinner(squares, boardSize);
    if (winner || squares[i]) return;

    const squaresCopy = [...squares];
    squaresCopy[i] = playerTurn;

    setSquares(squaresCopy);
    localStorage.setItem("squares", JSON.stringify(squaresCopy));
    const result = getWinner(squaresCopy, boardSize);
    if (result) {
      // @ts-ignore
      setWinner(result);
      localStorage.setItem("winnner", result);
      return;
    }

    setPlayerTurn(playerTurn === "X" ? "O" : "X");
    localStorage.setItem("playerTurn", playerTurn === "X" ? "O" : "X");
  };

  const handleNewGame = () => {
    setWinner(null);
    setSquares(Array(boardSize).fill(null));
    localStorage.removeItem("squares");
    localStorage.removeItem("playerTurn");
    localStorage.removeItem("boardSize");
    localStorage.removeItem("winner");
  };

  const style = {'--squares': Math.sqrt(boardSize)};

  return (
    // @ts-ignore
    <div className="App" style={style}>
      <Banner boardSize={boardSize} winner={winner as unknown as SquareType} handleBoardSize={handleBoardSize} handleNewGame={handleNewGame} />
      <div className="game">
        <Board onClick={handleSquareClick} squares={squares as unknown as SquareType[]} />
      </div>
    </div>
  );
}

export default App;
