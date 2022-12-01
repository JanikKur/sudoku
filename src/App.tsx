import { useState } from "react";
import SudokuGame from "./components/SudokuGame";
import SudokuSolver from "./components/SudokuSolver";

export default function App() {
  const [game, setGame] = useState<boolean>(true);

  return (
    <div className="App">
      <button className="btn switch" onClick={() => setGame(!game)}>
        {game ? "Sudoku Solver" : "Play Sudoku"}
      </button>
      {game ? <SudokuGame /> : <SudokuSolver />}
    </div>
  );
}
