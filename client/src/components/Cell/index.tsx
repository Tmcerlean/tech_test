import React from "react";

import { XorO } from "../../types";


interface CellProps {
    value: XorO | null;
    onClick: () => void;
}


const Cell = ({ 
    value,
    onClick
}: CellProps) => {
    return (
        <div 
            className="border-2 border-white w-24 h-24 cursor-pointer items-center justify-center text-2xl font-bold flex hover:bg-[var(--spruce-dark-green-hover)]"
            onClick={onClick}
        >
            <span className={value === "X" ? "text-blue-600" : "text-red-600"}>
                {value}
            </span>
        </div>
    )
};

export default Cell;