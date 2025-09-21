import React from "react";
import { useGameAPI } from "../../hooks/useGameAPI";


const GameHistory: React.FC = () => {
  const { gameResults, isLoading, isError, error } = useGameAPI();

  if (isLoading) {
    return (
      <div className="bg-white/10 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Game History</h3>
        <p className="text-white/70">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white/10 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Game History</h3>
        <p className="text-red-300">Error loading history: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-3">Game History</h3>

      {gameResults.length === 0 ? (
        <p className="text-white/70">No games played yet</p>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {gameResults.map((game) => (
            <div
              key={game.id}
              className="flex justify-between items-center bg-white/5 rounded p-2"
            >
              <span className="text-white">
                Winner: <span className="font-semibold">{game.winner}</span>
              </span>
              <span className="text-white/60 text-sm">
                {new Date(game.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {gameResults.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="text-white/70">
              X: {gameResults.filter(g => g.winner === "X").length}
            </div>
            <div className="text-white/70">
              O: {gameResults.filter(g => g.winner === "O").length}
            </div>
            <div className="text-white/70">
              Draw: {gameResults.filter(g => g.winner === "Draw").length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameHistory;