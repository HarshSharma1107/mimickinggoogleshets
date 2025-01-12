// hooks/useMathFunctions.ts
import { sum, average, max, min, count } from "../utils/mathFunctions";
import { MathFunction } from "../type";

export const useMathFunctions = () => {
  const applyFunction = (cells: (string | number)[], func: MathFunction) => {
    switch (func) {
      case "SUM":
        return sum(cells);
      case "AVERAGE":
        return average(cells);
      case "MAX":
        return max(cells);
      case "MIN":
        return min(cells);
      case "COUNT":
        return count(cells);
      default:
        return 0;
    }
  };

  return {
    applyFunction,
  };
};
