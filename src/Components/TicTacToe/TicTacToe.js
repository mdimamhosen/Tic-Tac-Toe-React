import React, { useState, useEffect } from "react";
import "./TicTacToe.css";

function TicTacToe() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameGrid, setGameGrid] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const [win, setWin] = useState(1);

  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
    if (gameGrid[index] === "" && !winner) {
      const newGameGrid = [...gameGrid];
      newGameGrid[index] = currentPlayer;
      setGameGrid(newGameGrid);
      checkGameOver(newGameGrid);
      swapTurn();
    }
  };

  const swapTurn = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkGameOver = (grid) => {
    winningPositions.forEach((position) => {
      if (
        grid[position[0]] &&
        grid[position[0]] === grid[position[1]] &&
        grid[position[1]] === grid[position[2]]
      ) {
        setWinner(grid[position[0]]);
        setWin(0);
      }
    });

    if (!winner && grid.every((val) => val !== "")) {
      setWinner("Tie");
    }
  };

  const resetGame = () => {
    setCurrentPlayer("X");
    setGameGrid(Array(9).fill(""));
    setWinner("");
    setWin(1);
  };

  return (
    <div className="wrapper">
      <p className="game-info">
        {!winner
          ? `Current Player - ${currentPlayer}`
          : winner === "Tie"
          ? "Game Tied!"
          : `Winner is - ${winner}`}
      </p>
      <div className="tictactoe">
        {gameGrid.map((value, index) => (
          <div
            key={index}
            className={`box ${value}  border  border-x-orange-500 `}
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      <button
        className={`btn ${winner || win === 0 ? "active" : ""}`}
        onClick={resetGame}
      >
        New Game
      </button>
    </div>
  );
}

export default TicTacToe;
