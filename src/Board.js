import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.3 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = new Array(nrows);
    // TODO: create array-of-arrays of true/false values

    for(let i=0; i < nrows; i++) {
      initialBoard[i] = new Array(ncols);
    }

    for(const arr of initialBoard) {
      for(let i=0; i < arr.length; i++) {
        let odds = Math.random();
        if(odds > chanceLightStartsOn) {
          arr.splice(i, 1, true)
        } else {
          arr.splice(i, 1, false)
        }
      }
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copy = oldBoard.map(arr => [...arr])

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, copy);
      flipCell(y, x-1, copy);
      flipCell(y, x+1, copy);
      flipCell(y-1, x, copy);
      flipCell(y+1, x, copy);

      // TODO: return the copy
      return copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()) {
    return (
      <div className="winner">You win! YAY!</div>
    )
  }

  // make table board
  let tblBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  );

}

export default Board;
