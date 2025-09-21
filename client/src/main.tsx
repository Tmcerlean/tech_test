import React from "react";
import useGame from "./hooks/useGame";

import Board from "./components/Board";
import Modal from "./components/Modal";


const Main = () => {
  const {
    board,
    currentPlayer,
    gameStatus,
    modal,
    winningPlayer,
    playMove,
    resetGame
  } = useGame();

  return (
    <div className="min-h-screen bg-[var(--spruce-dark-green)]">
      <div className="flex flex-col pt-10 items-center gap-10">
        <div className="font-bold text-center text-8xl text-white">Tic Tac Toe</div>
        
        {gameStatus === "playing" && (
          <div className="font-bold text-xl text-white">Current Player: {currentPlayer}</div>
        )}
        
        {gameStatus === "winner" && (
          <div className="font-bold text-xl text-white">Winner: {winningPlayer}!</div>
        )}
        
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
          <Board
            board={board}
            onCellClick={playMove}
          />
        </div>

        {modal && (
          <Modal
            isOpen={modal.isOpen}
            onClose={modal.onClose}
            title={modal.title}
            message={modal.message}
            type={modal.type}
            buttonText={modal.buttonText}
          />
        )}
        
        {gameStatus !== "playing" && (
          <button onClick={resetGame}>New Game</button>
        )}
      </div>
    </div>
  );
};

export default Main;