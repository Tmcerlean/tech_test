import { XorO } from "../types";


export const createEmptyBoard = (): (XorO | null)[][] => [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export const isBoardFull = (board: (XorO | null)[][]): boolean => {
    return board.every(row => row.every(cell => cell !== null));
};

export const placePiece = (
    board: (XorO | null)[][],
    rowIndex: number,
    columnIndex: number,
    player: XorO
): (XorO | null)[][] => {
    const newBoard = [...board];
    newBoard[rowIndex] = [...board[rowIndex]];
    newBoard[rowIndex][columnIndex] = player;
    return newBoard;
};