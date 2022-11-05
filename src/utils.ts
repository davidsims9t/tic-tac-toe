import { SquareType } from "./types";

export function getWinner(squares: SquareType[], boardSize: number): "X" | "O" | "Tie" | undefined {
    const cellSize = Math.sqrt(boardSize);
    const totalRows = (cellSize * 2) + 2;
    const lines = new Array(totalRows).fill(null).map((row) => new Array(cellSize).fill(null));
    for (let i = 0; i < cellSize; i++) {
        for (let j = 0; j < cellSize; j++) {
            lines[i][j] = (i * cellSize) + j;
            lines[i + cellSize][j] = i + (j * cellSize);

            if (i + (cellSize * 2) === lines.length - 2) {
                lines[i + (cellSize * 2)][j] = (cellSize * j) + j + i;
            }

            if (i + (cellSize * 2) === lines.length - 1) {
                lines[i + (cellSize * 2)][j] = (cellSize - 1) * (j + 1);
            }
        }
    }

    // @ts-ignore
    const sequence = lines.reduce((acc, row) => {
        const [first, ...rest] = row;
        return squares[first] && rest.every((col, j) => {
            return squares[first] === squares[col];
        }) ? squares[first] : acc;
    }, undefined);

    // @ts-ignore
    return sequence;
}