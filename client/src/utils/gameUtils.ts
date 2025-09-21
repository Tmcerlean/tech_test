import { XorO } from "../types";

export const checkWinCondition = (
    rowIndex: number,
    columnIndex: number,
    board: (XorO | null)[][]
): boolean => {
    const playerMarker = board[rowIndex][columnIndex];
    
    if (!playerMarker) return false;
    
    // Check horizontal
    if (board[rowIndex][0] === playerMarker && 
        board[rowIndex][1] === playerMarker && 
        board[rowIndex][2] === playerMarker) {
        return true;
    }
    
    // Check vertical
    if (board[0][columnIndex] === playerMarker && 
        board[1][columnIndex] === playerMarker && 
        board[2][columnIndex] === playerMarker) {
        return true;
    }
    
    // Check diagonal (top-left to bottom-right)
    if (rowIndex === columnIndex && 
        board[0][0] === playerMarker && 
        board[1][1] === playerMarker && 
        board[2][2] === playerMarker) {
        return true;
    }
    
    // Check other diagonal
    if (rowIndex + columnIndex === 2 && 
        board[0][2] === playerMarker && 
        board[1][1] === playerMarker && 
        board[2][0] === playerMarker) {
        return true;
    }
    
    return false;
};