import React from "react";
import { MouseEventHandler } from "react";
import type { SquareType } from "./types";

function Square({ onClick, square, i }: { square: SquareType, onClick: (i: number) => void, i: number }) {
    return (
        <button onClick={() => onClick(i)} className="square">
            {square}
        </button>
    )
}

export default Square;