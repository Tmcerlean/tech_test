import React from "react";

import { XorO, GameStatus } from "../../types";


interface GameControlsProps {
    boardSize: number;
    currentPlayer: XorO;
    gameStatus: GameStatus;
    winningPlayer: XorO | null;
    onBoardSizeChange: (size: number) => void;
}


const GameControls = ({
    boardSize,
    currentPlayer,
    gameStatus,
    winningPlayer,
    onBoardSizeChange
}: GameControlsProps) => {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
                <label className="font-bold text-xl text-white">
                    Board Size:
                </label>
                <input
                    type="number"
                    min="3"
                    max="15"
                    value={boardSize}
                    className="px-3 py-2 text-center rounded border-1"
                    onChange={(e) => {
                        const size = parseInt(e.target.value);
                        if (size >= 3 && size <= 15) {
                            onBoardSizeChange(size);
                        }
                    }}
                />
            </div>

            {gameStatus === "playing" && (
                <div className="font-bold text-xl text-white">Current Player: {currentPlayer}</div>
            )}

            {gameStatus === "winner" && (
                <div className="font-bold text-xl text-white">Winner: {winningPlayer}!</div>
            )}
        </div>
    );
};

export default GameControls;