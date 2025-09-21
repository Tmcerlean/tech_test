import { XorO } from "../types";


// export const checkWinCondition = (
//     rowIndex: number,
//     columnIndex: number,
//     board: (XorO | null)[][]
// ): boolean => {
//     const playerMarker = board[rowIndex][columnIndex];
    
//     if (!playerMarker) return false;
    
//     // Check horizontal
//     if (
//         board[rowIndex][0] === playerMarker && 
//         board[rowIndex][1] === playerMarker && 
//         board[rowIndex][2] === playerMarker
//     ) {
//         return true;
//     }
    
//     // Check vertical
//     if (
//         board[0][columnIndex] === playerMarker && 
//         board[1][columnIndex] === playerMarker && 
//         board[2][columnIndex] === playerMarker
//     ) {
//         return true;
//     }
    
//     // Check diagonal (top-left to bottom-right)
//     if (rowIndex === columnIndex && 
//         board[0][0] === playerMarker && 
//         board[1][1] === playerMarker && 
//         board[2][2] === playerMarker
//     ) {
//         return true;
//     }
    
//     // Check other diagonal
//     if (rowIndex + columnIndex === 2 && 
//         board[0][2] === playerMarker && 
//         board[1][1] === playerMarker && 
//         board[2][0] === playerMarker
//     ) {
//         return true;
//     }
    
//     return false;
// };


// New win condition - 3 in a row still, but for boards up to 15x15
export const checkWinCondition = (
    rowIndex: number,
    columnIndex: number,
    board: (XorO | null)[][]
): boolean => {
    const playerMarker = board[rowIndex][columnIndex];
    
    if (!playerMarker) return false;
    
    const boardSize = board.length;


    // Check horizontal
    let count = 1;

    // Count left
    for (let col = columnIndex - 1; col >= 0 && board[rowIndex][col] === playerMarker; col--) {
        count++;
    }

    // Count right
    for (let col = columnIndex + 1; col < boardSize && board[rowIndex][col] === playerMarker; col++) {
        count++;
    }

    if (count >= 3) return true;


    // Check vertical
    count = 1;

    // Count up
    for (let row = rowIndex - 1; row >= 0 && board[row][columnIndex] === playerMarker; row--) {
        count++;
    }

    // Count down
    for (let row = rowIndex + 1; row < boardSize && board[row][columnIndex] === playerMarker; row++) {
        count++;
    }

    if (count >= 3) return true;


    /// Check diagonal (top-left to bottom-right)
    count = 1;

    // Count up-left
    for (
            let row = rowIndex - 1, col = columnIndex - 1; 
            row >= 0 && col >= 0 && board[row][col] === playerMarker; 
            row--, col--
        ) {
        count++;
    }

    // Count down-right
    for (
            let row = rowIndex + 1, col = columnIndex + 1; 
            row < boardSize && col < boardSize && board[row][col] === playerMarker; 
            row++, col++
        ) {
        count++;
    }

    if (count >= 3) return true;


    // Check other diagonal
    count = 1;

    // Count up-right
    for (
            let row = rowIndex - 1, col = columnIndex + 1; 
            row >= 0 && col < boardSize && board[row][col] === playerMarker; 
            row--, col++
        ) {
        count++;
    }

    // Count down-left
    for (
            let row = rowIndex + 1, col = columnIndex - 1; 
            row < boardSize && col >= 0 && board[row][col] === playerMarker; 
            row++, col--
        ) {
        count++;
    }

    if (count >= 3) return true;


    return false;
};