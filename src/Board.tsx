import React, { MouseEventHandler, useState } from "react";
import Square from "./Square";
import type { SquareType } from "./types";

function Board({ squares, onClick }: { squares: SquareType[], onClick: (i: number) => void }) {
    return (
        <div className="board">
            {squares.map((square: SquareType, i: number) => {
                return (
                    <Square square={square} onClick={onClick} i={i} key={i} />
                );
            })}
        </div>
    )
}

export default Board;