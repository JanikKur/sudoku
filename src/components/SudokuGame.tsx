import React, { useEffect, useMemo, useState } from "react";
import Board from "../components/Board";
import {
  getRandomSudoku,
  solveSudoku,
  SudokuElement,
} from "../services/sudoku";
import "../styles/board.css";

export default function SudokuGame() {
  const MAX_LIVES = 5;
  const [difficulty, setDifficulty] = useState<
    "easy" | "medium" | "hard" | "expert" | undefined
  >("easy");
  const [lives, setLives] = useState<number>(MAX_LIVES);
  const [sudoku, setSudoku] = useState<SudokuElement[]>(
    getRandomSudoku(difficulty)
  );
  const solution = useMemo(() => solveSudoku(sudoku), [sudoku]);
   

  useEffect(() => {
    if (lives <= 0) {
      getSolution();
    }
  }, [lives]);

  function getSolution() {
    setSudoku(solution);
  }

  function submitSoduko() {
    for (let idx in solution) {
      if (solution[idx].value !== sudoku[idx].value) {
        alert("FALSCH");
        return;
      }
    }
    alert("KORREKT");
  }

  function handleChange(value: number, idx: number) {
    if (isNaN(value)) return;

    if (value !== 0 && solution[idx].value !== value) {
      setLives((prev) => prev - 1);
    }

    setSudoku((prev: SudokuElement[]) => {
      prev[idx] = {
        value: Math.min(9, Math.max(0, value)), //Value between 0 - 9
        isDefault: false,
      };
      return [...prev];
    });
  }

  function reset() {
    setLives(MAX_LIVES);
    setSudoku(getRandomSudoku(difficulty));
  }

  function handleDifficultyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newDifficulty = e.target.value;
    if (
      newDifficulty === "easy" ||
      newDifficulty === "medium" ||
      newDifficulty === "hard" ||
      newDifficulty === "expert" ||
      newDifficulty === undefined
    ) {
      setDifficulty(newDifficulty);
    }
  }

  return (
    <div className="content">
      <h1>SUDOKU</h1>
      <div className="game-info">
        <label>
          Lives: {lives}
        </label>
        <select onChange={handleDifficultyChange}>
          <option value="easy" selected>Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="expert">Expert</option>
        </select>
      </div>
      <Board sudoku={sudoku} solution={solution} handleChange={handleChange} />
      <div className="controls">
        <button className="btn btn-secondary" onClick={reset}>
          New Sudoku
        </button>
        <button className="btn btn-secondary" onClick={getSolution}>
          Get Solution
        </button>
        <button className="btn btn-primary" onClick={submitSoduko}>
          Submit
        </button>
      </div>
    </div>
  );
}
