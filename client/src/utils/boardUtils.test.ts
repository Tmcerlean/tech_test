import { createEmptyBoard, isBoardFull, placePiece } from "./boardUtils";
import { XorO } from "../types";


describe("boardUtils", () => {
  describe("createEmptyBoard", () => {
    it("should create 3x3 empty board", () => {
      const board = createEmptyBoard(3);

      expect(board).toHaveLength(3);
      expect(board[0]).toHaveLength(3);
      expect(board.every(row => row.every(cell => cell === null))).toBe(true);
    });

    it("should create 15x15 empty board", () => {
      const board = createEmptyBoard(15);

      expect(board).toHaveLength(15);
      expect(board[0]).toHaveLength(15);
      expect(board.every(row => row.every(cell => cell === null))).toBe(true);
    });
  });

  describe("isBoardFull", () => {
    it("should return false for empty board", () => {
      const board = createEmptyBoard(3);
      expect(isBoardFull(board)).toBe(false);
    });

    it("should return false for partially filled board", () => {
      const board: (XorO | null)[][] = [
        ["X", "O", null],
        ["O", "X", "O"],
        ["X", null, "X"]
      ];
      expect(isBoardFull(board)).toBe(false);
    });

    it("should return true for completely filled board", () => {
      const board: (XorO | null)[][] = [
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["X", "O", "X"]
      ];
      expect(isBoardFull(board)).toBe(true);
    });
  });

  describe("placePiece", () => {
    it("should place piece without mutating original board", () => {
      const originalBoard = createEmptyBoard(3);
      const originalRef = originalBoard[0];

      const newBoard = placePiece(originalBoard, 0, 0, "X");

      expect(originalBoard[0][0]).toBe(null);
      expect(newBoard[0][0]).toBe("X");
      expect(originalBoard[0]).toBe(originalRef);
      expect(newBoard[0]).not.toBe(originalRef);
    });

    it("should place X piece correctly", () => {
      const board = createEmptyBoard(3);
      const newBoard = placePiece(board, 1, 1, "X");

      expect(newBoard[1][1]).toBe("X");
    });

    it("should place O piece correctly", () => {
      const board = createEmptyBoard(3);
      const newBoard = placePiece(board, 2, 0, "O");

      expect(newBoard[2][0]).toBe("O");
    });
  });
});