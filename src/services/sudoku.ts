import axios from "axios";
import { solvepuzzle } from "sudoku";
import { getSudoku } from 'sudoku-gen';

export type SudokuElement = {
  value: number | null;
  isDefault: boolean;
};

export function getRandomSudoku(difficulty : 'easy' | 'medium' | 'hard' | 'expert' | undefined): SudokuElement[] {

  const sudokuString = getSudoku(difficulty).puzzle;
  const puzzle :SudokuElement[] = [];
  for(let i = 0; i < sudokuString.length; i++){
    const elem = sudokuString[i];
    puzzle.push({
      value: elem === '-' ? null : parseInt(elem),
      isDefault: elem !== '-',
    });
  }

  return puzzle;
}

export function solveSudoku(sudoku: SudokuElement[]): SudokuElement[] {
  const board = [...sudoku].map((elem) => {
    if (!elem.isDefault) {
      return null;
    }
    if (elem.value !== null) {
      return elem.value -1;
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
