import { useState } from "react";
import Board from "../components/Board";
import { solveSudoku, SudokuElement } from "../services/sudoku";
import "../styles/board.css";

export default function SudokuSolver() {
  const [sudokuBlank, setSudokuBlank] = useState<SudokuElement[]>(
    new Array(81).fill({ value: null, isDefault: false }, 0, 100)
  );
  const solution = sudokuBlank;

  function getSolution() {
    setSudokuBlank(
      solveSudoku(
        sudokuBlank.map((elem) => {
          return {
            value: elem.value,
            isDefault: elem.value !== null && elem.value !== 0,
          };
        })
      )
    );
  }

  function handleChange(value: number, idx: number) {
    if (isNaN(value)) return;

    setSudokuBlank((prev: SudokuElement[]) => {
      prev[idx] = {
        value: Math.min(9, Math.max(0, value)), //Value between 0 - 9
        isDefault: false,
      };
      return [...prev];
    });
  }

  function reset() {
    setSudokuBlank(
      new Array(81).fill({ value: null, isDefault: false }, 0, 100)
    );
  }

  return (
    <div className="content">
      <h1>SUDOKU SOLVER</h1>
      <Board
        sudoku={sudokuBlank}
        solution={solution}
        handleChange={handleChange}
      />
      <div className="controls">
        <button className="btn btn-secondary" onClick={getSolution}>
          Get Solution
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
