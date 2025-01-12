import React, { useState } from "react";
// import Chart from "chart.js/auto";

const Spreadsheet = () => {
  const rows = 20;
  const columns = 10;

  const [gridData, setGridData] = useState(
    Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => "")
    )
  );

  // const chartRef = useRef<HTMLCanvasElement | null>(null);
  // const chartInstance = useRef<Chart | null>(null);

  const handleInputChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const updatedData = gridData.map((row, i) =>
      i === rowIndex
        ? row.map((cell, j) => (j === colIndex ? value : cell))
        : row
    );
    setGridData(updatedData);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    if (event.key === "Enter") {
      const value = gridData[rowIndex][colIndex];

      if (value.startsWith("=")) {
        const result = evaluateFormula(value);
        const updatedData = gridData.map((row, i) =>
          i === rowIndex
            ? row.map((cell, j) => (j === colIndex ? result : cell))
            : row
        );
        setGridData(updatedData);
      }
    }
  };

  const evaluateFormula = (formula: string): string => {
    try {
      if (formula.startsWith("=")) {
        const command = formula.slice(1).toUpperCase();
        const match = command.match(/(\w+)\((.*)\)/);

        if (match) {
          const operation = match[1];
          const args = match[2];

          switch (operation) {
            case "SUM":
            case "AVERAGE":
            case "MAX":
            case "MIN":
              return calculateRangeFormula(args, operation).toString();
            case "IF":
              return calculateIfFormula(args);
            case "UPPER":
              return upperCell(args);
            case "LOWER":
              return lowerCell(args);
            case "TRIM":
              return trimCell(args);
            default:
              return "Invalid Function";
          }
        }
      }
      return "Invalid Formula";
    } catch (error) {
      console.error("Formula evaluation error:", error);
      return "Error";
    }
  };

  const calculateRangeFormula = (range: string, operation: string): number => {
    const [startCell, endCell] = range.split(":").map((cell) => cell.trim());
    const [startCol, startRow] = parseCell(startCell);
    const [endCol, endRow] = parseCell(endCell);

    const values: number[] = [];
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const cellValue = parseFloat(gridData[row]?.[col] || "0");
        if (!isNaN(cellValue)) {
          values.push(cellValue);
        }
      }
    }

    switch (operation) {
      case "SUM":
        return values.reduce((acc, val) => acc + val, 0);
      case "AVERAGE":
        return values.length
          ? values.reduce((acc, val) => acc + val, 0) / values.length
          : 0;
      case "MAX":
        return Math.max(...values);
      case "MIN":
        return Math.min(...values);
      default:
        return 0;
    }
  };

  const calculateIfFormula = (args: string): string => {
    const [condition, trueValue, falseValue] = args
      .split(",")
      .map((arg) => arg.trim());
    const match = condition.match(/(\w+)([<>=!]+)(.+)/);

    if (match) {
      const [_, cell, operator, value] = match;
      const [col, row] = parseCell(cell);
      const cellValue = parseFloat(gridData[row]?.[col] || "0");
      const targetValue = parseFloat(value);

      switch (operator) {
        case ">":
          return cellValue > targetValue ? trueValue : falseValue;
        case "<":
          return cellValue < targetValue ? trueValue : falseValue;
        case ">=":
          return cellValue >= targetValue ? trueValue : falseValue;
        case "<=":
          return cellValue <= targetValue ? trueValue : falseValue;
        case "==":
          return cellValue === targetValue ? trueValue : falseValue;
        case "!=":
          return cellValue !== targetValue ? trueValue : falseValue;
        default:
          return falseValue;
      }
    }
    return falseValue;
  };

  const trimCell = (cell: string): string => {
    const [col, row] = parseCell(cell);
    return gridData[row][col].trim();
  };

  const upperCell = (cell: string): string => {
    const [col, row] = parseCell(cell);
    return gridData[row][col].toUpperCase();
  };

  const lowerCell = (cell: string): string => {
    const [col, row] = parseCell(cell);
    return gridData[row][col].toLowerCase();
  };

  const parseCell = (cell: string): [number, number] => {
    const col = cell.charCodeAt(0) - 65;
    const row = parseInt(cell.slice(1), 10) - 1;
    return [col, row];
  };

  return (
    <div className="spreadsheet">
      <div className="row header">
        <div className="cell-header corner"></div>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div key={colIndex} className="cell-header column-header">
            {String.fromCharCode(65 + colIndex)}
          </div>
        ))}
      </div>
      {gridData.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          <div className="cell-header row-header">{rowIndex + 1}</div>
          {row.map((cellValue, colIndex) => (
            <div key={colIndex} className="cell">
              <input
                type="text"
                value={cellValue}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, e.target.value)
                }
                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Spreadsheet;
