import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const API_BASE_URL = "http://localhost:3001/api";


export interface GameResult {
  id: number;
  winner: string;
  createdAt: string;
}


const saveGameResult = async (winner: "X" | "O" | "Draw"): Promise<GameResult> => {
  const response = await fetch(`${API_BASE_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ winner })
  });

  if (!response.ok) {
    throw new Error(`Failed to save game result: ${response.statusText}`);
  }

  return response.json();
};

const fetchGameResults = async (): Promise<GameResult[]> => {
  const response = await fetch(`${API_BASE_URL}/games`);

  if (!response.ok) {
    throw new Error(`Failed to fetch game results: ${response.statusText}`);
  }

  return response.json();
};

export const useGameAPI = () => {
  const queryClient = useQueryClient();

  // Query for fetching game results
  const gameResults = useQuery({
    queryKey: ["gameResults"],
    queryFn: fetchGameResults,
    staleTime: 30000
  });

  // Mutation for saving game results
  const saveGameMutation = useMutation({
    mutationFn: saveGameResult,
    onError: (error) => {
      console.error("Failed to save game result:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gameResults"] });
    }
  });

  return {
    error: gameResults.error,
    gameResults: gameResults.data || [],
    isLoading: gameResults.isLoading,
    isError: gameResults.isError,
    saveGame: saveGameMutation.mutate
  };
};