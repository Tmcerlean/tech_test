import { checkWinCondition } from "./gameUtils";
import { XorO } from "../types";


describe("checkWinCondition", () => {
  const createBoard = (size: number): (XorO | null)[][] => {
    return Array(size).fill(null).map(() => Array(size).fill(null));
  };

  describe("Horizontal wins", () => {
    it("should detect horizontal win in top row", () => {
      const board = createBoard(3);
      board[0][0] = "X";
      board[0][1] = "X";
      board[0][2] = "X";

      expect(checkWinCondition(0, 2, board)).toBe(true);
    });
  });

  describe("Vertical wins", () => {
    it("should detect vertical win in first column", () => {
      const board = createBoard(3);
      board[0][0] = "X";
      board[1][0] = "X";
      board[2][0] = "X";

      expect(checkWinCondition(1, 0, board)).toBe(true);
    });
  });

  describe("Diagonal wins", () => {
    it("should detect main diagonal win (top-left to bottom-right)", () => {
      const board = createBoard(3);
      board[0][0] = "X";
      board[1][1] = "X";
      board[2][2] = "X";

      expect(checkWinCondition(1, 1, board)).toBe(true);
    });
  });

  describe("Edge cases", () => {
    it("should work on minimum 3x3 board", () => {
      const board = createBoard(3);
      board[0][0] = "X";
      board[0][1] = "X";
      board[0][2] = "X";

      expect(checkWinCondition(0, 0, board)).toBe(true);
    });

    it("should work on maximum 15x15 board", () => {
      const board = createBoard(15);
      board[7][7] = "O";
      board[7][8] = "O";
      board[7][9] = "O";

      expect(checkWinCondition(7, 8, board)).toBe(true);
    });
  });
});