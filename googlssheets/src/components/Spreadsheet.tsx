import React, { useState } from "react";
import FormulaBar from "./FormulaBar";

const Spreadsheet = () => {
  const rows = 20;
  const columns = 10;

  const [gridData, setGridData] = useState(
    Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => "")
    )
  );
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  const [formulaInput, setFormulaInput] = useState("");

  // Update the cell value in the grid
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

  // Handle FormulaBar input change
  const handleFormulaBarChange = (value: string) => {
    setFormulaInput(value);
    const { row, col } = selectedCell;
    handleInputChange(row, col, value);
  };

  // Handle Enter key in the FormulaBar
  const handleFormulaBarEnter = () => {
    const { row, col } = selectedCell;
    if (formulaInput.startsWith("=")) {
      const result = evaluateFormula(formulaInput);
      handleInputChange(row, col, result);
    }
  };

  // Apply formula logic when editing cells directly
  const applyFormula = (rowIndex: number, colIndex: number) => {
    const value = gridData[rowIndex][colIndex];
    if (value.startsWith("=")) {
      const result = evaluateFormula(value);
      handleInputChange(rowIndex, colIndex, result);
    }
  };

  // Evaluate formulas
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
            case "FILTER":
              return calculateFilterFormula(args);
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

  // Range formulas: SUM, AVERAGE, MAX, MIN
  const calculateRangeFormula = (args: string, operation: string): number => {
    const cells = args.split(",").map((cell) => cell.trim());
    const values: number[] = [];

    cells.forEach((cell) => {
      const [col, row] = parseCell(cell);
      const cellValue = parseFloat(gridData[row]?.[col] || "0");
      if (!isNaN(cellValue)) {
        values.push(cellValue);
      }
    });

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

  // IF Formula
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
    return "Invalid Condition";
  };

  // FILTER Formula
  const calculateFilterFormula = (args: string): string => {
    const [rangeArg, conditionArg] = args.split(",").map((arg) => arg.trim());
    const cells = rangeArg.split(":").map((cell) => cell.trim());
    const [startCell, endCell] = cells;
    const [startCol, startRow] = parseCell(startCell);
    const [endCol, endRow] = parseCell(endCell);

    const conditionMatch = conditionArg.match(/(\w+)([<>=!]+)(.+)/);

    if (!conditionMatch) return "Invalid FILTER Condition";

    const [_, conditionCell, operator, conditionValue] = conditionMatch;
    const targetValue = parseFloat(conditionValue);

    const filteredValues: number[] = [];

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const cellValue = parseFloat(gridData[row]?.[col] || "0");
        let conditionMet = false;
        switch (operator) {
          case ">":
            conditionMet = cellValue > targetValue;
            break;
          case "<":
            conditionMet = cellValue < targetValue;
            break;
          case ">=":
            conditionMet = cellValue >= targetValue;
            break;
          case "<=":
            conditionMet = cellValue <= targetValue;
            break;
          case "==":
            conditionMet = cellValue === targetValue;
            break;
          case "!=":
            conditionMet = cellValue !== targetValue;
            break;
          default:
            return "Invalid FILTER Operator";
        }

        if (conditionMet) {
          filteredValues.push(cellValue);
        }
      }
    }

    return filteredValues.join(", ");
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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    if (e.key === "Enter") {
      applyFormula(rowIndex, colIndex);
    }
  };

  return (
    <div className="spreadsheet-container">
      <FormulaBar
        value={formulaInput}
        onChange={handleFormulaBarChange}
        onEnter={handleFormulaBarEnter}
        cell={`${String.fromCharCode(65 + selectedCell.col)}${
          selectedCell.row + 1
        }`}
      />
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
              <div
                key={colIndex}
                className={`cell ${
                  selectedCell.row === rowIndex && selectedCell.col === colIndex
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCell({ row: rowIndex, col: colIndex })
                }
              >
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
    </div>
  );
};

export default Spreadsheet;
