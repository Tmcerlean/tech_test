import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useGameAPI } from "./useGameAPI";


const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;


describe("useGameAPI", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("saveGame", () => {
    it("should successfully save game result", async () => {
      const mockResponse = {
        id: 1,
        winner: "X",
        createdAt: "2023-01-01T00:00:00Z"
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const { result } = renderHook(() => useGameAPI(), {
        wrapper: createWrapper()
      });

      await waitFor(() => {
        result.current.saveGame("X");
      });

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/games",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ winner: "X" })
        }
      );
    });

    it("should save draw result", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 2, winner: "Draw", createdAt: "2023-01-01T00:00:00Z" })
      } as Response);

      const { result } = renderHook(() => useGameAPI(), {
        wrapper: createWrapper()
      });

      await waitFor(() => {
        result.current.saveGame("Draw");
      });

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/games",
        expect.objectContaining({
          body: JSON.stringify({ winner: "Draw" })
        })
      );
    });
  });

  describe("fetchGameResults", () => {
    it("should successfully fetch game results", async () => {
      const mockResults = [
        { id: 1, winner: "X", createdAt: "2023-01-01T00:00:00Z" },
        { id: 2, winner: "O", createdAt: "2023-01-01T01:00:00Z" }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResults
      } as Response);

      const { result } = renderHook(() => useGameAPI(), {
        wrapper: createWrapper()
      });

      await waitFor(() => {
        expect(result.current.gameResults).toEqual(mockResults);
      });

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:3001/api/games");
    });
  });
});