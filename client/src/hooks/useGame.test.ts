import { renderHook, act } from "@testing-library/react";
import useGame from "./useGame";

import { XorO } from "../types";
import * as gameUtils from "../utils/gameUtils";
import * as boardUtils from "../utils/boardUtils";


jest.mock("./useGameAPI", () => ({
  useGameAPI: () => ({
    saveGame: jest.fn()
  })
}));

jest.mock("../utils/gameUtils");
jest.mock("../utils/boardUtils");

const mockCheckWinCondition = gameUtils.checkWinCondition as jest.MockedFunction<typeof gameUtils.checkWinCondition>;
const mockCreateEmptyBoard = boardUtils.createEmptyBoard as jest.MockedFunction<typeof boardUtils.createEmptyBoard>;
const mockIsBoardFull = boardUtils.isBoardFull as jest.MockedFunction<typeof boardUtils.isBoardFull>;
const mockPlacePiece = boardUtils.placePiece as jest.MockedFunction<typeof boardUtils.placePiece>;


describe("useGame", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateEmptyBoard.mockReturnValue([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
  });

  describe("playMove", () => {
    it("should prevent moves on occupied cells", () => {
      const { result } = renderHook(() => useGame());

      const boardWithOccupiedCell: (XorO | null)[][] = [
        ["X", null, null],
        [null, null, null],
        [null, null, null]
      ];

      mockCreateEmptyBoard.mockReturnValue(boardWithOccupiedCell);

      const { result: newResult } = renderHook(() => useGame());

      act(() => {
        newResult.current.playMove(0, 0); // Try to play on occupied cell
      });

      expect(newResult.current.modal?.type).toBe("error");
      expect(newResult.current.modal?.message).toContain("already occupied");
    });

    it("should switch players after valid move", () => {
      const { result } = renderHook(() => useGame());

      const newBoard: (XorO | null)[][] = [
        ["X", null, null],
        [null, null, null],
        [null, null, null]
      ];

      mockPlacePiece.mockReturnValue(newBoard);
      mockCheckWinCondition.mockReturnValue(false);
      mockIsBoardFull.mockReturnValue(false);

      expect(result.current.currentPlayer).toBe("X");

      act(() => {
        result.current.playMove(0, 0);
      });

      expect(result.current.currentPlayer).toBe("O");
    });

    it("should trigger win state when win condition is met", () => {
      const { result } = renderHook(() => useGame());

      const winningBoard: (XorO | null)[][] = [
        ["X", "X", "X"],
        [null, null, null],
        [null, null, null]
      ];

      mockPlacePiece.mockReturnValue(winningBoard);
      mockCheckWinCondition.mockReturnValue(true);

      act(() => {
        result.current.playMove(0, 2);
      });

      expect(result.current.gameStatus).toBe("winner");
      expect(result.current.winningPlayer).toBe("X");
      expect(result.current.modal?.type).toBe("success");
    });

    it("should trigger draw state when board is full", () => {
      const { result } = renderHook(() => useGame());

      const fullBoard: (XorO | null)[][] = [
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["O", "X", "O"]
      ];

      mockPlacePiece.mockReturnValue(fullBoard);
      mockCheckWinCondition.mockReturnValue(false);
      mockIsBoardFull.mockReturnValue(true);

      act(() => {
        result.current.playMove(2, 2);
      });

      expect(result.current.gameStatus).toBe("draw");
      expect(result.current.modal?.type).toBe("info");
    });
  });

  describe("changeBoardSize", () => {
    it("should properly reset game state when changing board size", () => {
      const { result } = renderHook(() => useGame());

      const newEmptyBoard: (XorO | null)[][] = Array(5).fill(null).map(() => Array(5).fill(null));
      mockCreateEmptyBoard.mockReturnValue(newEmptyBoard);

      act(() => {
        result.current.changeBoardSize(5);
      });

      expect(result.current.currentPlayer).toBe("X");
      expect(result.current.gameStatus).toBe("playing");
      expect(result.current.winningPlayer).toBe(null);
      expect(result.current.modal).toBe(null);
    });

    it("should reject invalid board sizes", () => {
      const { result } = renderHook(() => useGame());

      const initialBoard = result.current.board;

      act(() => {
        result.current.changeBoardSize(2);
      });

      expect(result.current.board).toBe(initialBoard);

      act(() => {
        result.current.changeBoardSize(16);
      });

      expect(result.current.board).toBe(initialBoard);
    });

    it("should accept valid board sizes (3-15)", () => {
      const { result } = renderHook(() => useGame());

      [3, 5, 10, 15].forEach(size => {
        const expectedBoard: (XorO | null)[][] = Array(size).fill(null).map(() => Array(size).fill(null));
        mockCreateEmptyBoard.mockReturnValue(expectedBoard);

        act(() => {
          result.current.changeBoardSize(size);
        });

        expect(mockCreateEmptyBoard).toHaveBeenCalledWith(size);
      });
    });
  });

  describe("resetGame", () => {
    it("should reset all game state to initial values", () => {
      const { result } = renderHook(() => useGame());

      act(() => {
        result.current.playMove(0, 0);
      });

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.currentPlayer).toBe("X");
      expect(result.current.gameStatus).toBe("playing");
      expect(result.current.winningPlayer).toBe(null);
      expect(result.current.modal).toBe(null);
    });
  });
});