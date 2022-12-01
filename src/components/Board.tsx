import React from "react";
import { SudokuElement } from "../services/sudoku";

type BoardAttr = {
  sudoku: SudokuElement[];
  solution: SudokuElement[];
  handleChange: Function;
};

export default function Board({ sudoku, handleChange, solution }: BoardAttr) {
  function isBaseline(idx: number) {
    return (idx >= 18 && idx < 27) || (idx >= 45 && idx < 54);
  }

  return (
    <div className="board">
      {sudoku.map((elem, idx) => {
        if (elem.isDefault) {
          return (
            <div
              className={`value default ${isBaseline(idx) ? "base-line" : ""}`}
              key={idx}
            >
              {elem.value}
            </div>
          );
        }
        return (
          <input
            className={`value ${
              elem.value && elem.value !== solution[idx].value
                ? "incorrect"
                : ""
            } ${isBaseline(idx) ? "base-line" : ""}`}
            type="text"
            key={idx}
            value={elem.value || ""}
            onChange={(e) => handleChange(Number(e.target.value), idx)}
          ></input>
        );
      })}
    </div>
  );
}
