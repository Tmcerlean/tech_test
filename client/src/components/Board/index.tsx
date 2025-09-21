import React from "react";

import { XorO } from "../../types";
import Cell from "../Cell";


interface BoardProps {
    board: (XorO | null)[][];
    onCellClick: (rowIndex: number, columnIndex: number) => void;
}


const Board = ({ 
    board, 
    onCellClick 
}: BoardProps) => {
    return (
        <div className="flex flex-col gap-1">
            {board.map((row, rowIndex) =>
                <div className="flex gap-1" key={rowIndex}>
                    {row.map((cell, columnIndex) =>
                        <Cell
                            key={columnIndex}
                            onClick={() => onCellClick(rowIndex, columnIndex)}
                            value={cell}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Board;