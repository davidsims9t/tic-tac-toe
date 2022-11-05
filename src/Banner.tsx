import React, { ChangeEventHandler, useEffect, useState } from "react";
import { MouseEventHandler } from "react";
import { SquareType } from "./types";

function Banner({ handleBoardSize, boardSize, winner, handleNewGame }: { winner: SquareType; boardSize: number, handleBoardSize: (i: number) => void, handleNewGame: MouseEventHandler<HTMLButtonElement> }) {
    const [localBoardSize, setLocalBoardSize] = useState(boardSize);

    const handleLocalBoardSize: ChangeEventHandler = (event) => {
        console.log(event);
        // @ts-ignore
        if (+event.currentTarget.value <= 0) return;

        // @ts-ignore
        handleBoardSize(+event.currentTarget.value);
        // @ts-ignore
        setLocalBoardSize(+event.currentTarget.value);
    };

    return (
        <div className="banner">
            <div className="winner">{winner && <div>{winner} is the winner!</div>}</div>
            <button className="new-game" onClick={handleNewGame}>Start New Game</button>
            <div>
                Board Size: <input className="board-size" type="number" onChange={handleLocalBoardSize} value={localBoardSize} />
            </div>
        </div>
    )
}

export default Banner;