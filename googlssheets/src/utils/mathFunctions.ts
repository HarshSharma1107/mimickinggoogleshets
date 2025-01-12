// utils/mathFunctions.ts

export const sum = (cells: (string | number)[]): number => {
    return cells.reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0);
  };
  
  export const average = (cells: (string | number)[]): number => {
    const validCells = cells.filter((cell) => typeof cell === 'number');
    return sum(validCells) / validCells.length;
  };
  
  export const max = (cells: (string | number)[]): number => {
    return Math.max(...cells.filter((cell) => typeof cell === 'number'));
  };
  
  export const min = (cells: (string | number)[]): number => {
    return Math.min(...cells.filter((cell) => typeof cell === 'number'));
  };
  
  export const count = (cells: (string | number)[]): number => {
    return cells.filter((cell) => typeof cell === 'number').length;
  };
  