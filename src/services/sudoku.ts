import axios from "axios";
import { makepuzzle, solvepuzzle } from "sudoku";

export type SudokuElement = {
  value: number | null;
  isDefault: boolean;
};

export function getRandomSudoku(): SudokuElement[] {
  return makepuzzle().map((elem: number | null) => {
    return {
      value: elem !== null ? elem + 1 : elem,
      isDefault: elem !== null,
    };
  });
}

export function solveSudoku(sudoku: SudokuElement[]): SudokuElement[] {
  const board = [...sudoku].map((elem) => {
    if (!elem.isDefault) {
      return null;
    }
    if (elem.value !== null) {
      return elem.value - 1;
    }
    return null;
  });

  return solvepuzzle(board).map((elem: number) => {
    return {
      value: elem + 1,
      isDefault: true,
    };
  });
}
