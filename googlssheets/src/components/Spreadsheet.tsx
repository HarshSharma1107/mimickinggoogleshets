import React, { useState } from "react";

const Spreadsheet = () => {
  const rows = 20;
  const columns = 10;

  // State to store cell data
  const [gridData, setGridData] = useState(
    Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => "")
    )
  );

  // Handle cell input changes
  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const updatedData = gridData.map((row, i) =>
      i === rowIndex
        ? row.map((cell, j) => (j === colIndex ? value : cell))
        : row
    );

    setGridData(updatedData);
  };

  // Handle formula evaluation on Enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, rowIndex: number, colIndex: number) => {
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

  // Function to evaluate formulas
  const evaluateFormula = (formula: string): string => {
    try {
      if (formula.startsWith("=")) {
        const command = formula.slice(1).toUpperCase(); // Remove "=" and convert to uppercase
        if (command.startsWith("SUM")) {
          const range = command.match(/\((.*)\)/)?.[1]; // Extract range inside parentheses
          if (range) {
            return calculateSum(range).toString();
          }
        }
      }
      return "Invalid Formula";
    } catch (error) {
      console.error("Formula evaluation error:", error);
      return "Error";
    }
  };

  // Function to calculate the sum of individual cells or a range
  const calculateSum = (range: string): number => {
    const cells = range.split(",").map((cell) => cell.trim()); // Split by commas and trim spaces
    let sum = 0;

    cells.forEach((cell) => {
      const col = cell.charCodeAt(0) - 65; // Column letter to index
      const row = parseInt(cell.slice(1), 10) - 1; // Row number to index

      if (gridData[row] && gridData[row][col]) {
        const cellValue = parseFloat(gridData[row][col]);
        if (!isNaN(cellValue)) {
          sum += cellValue;
        }
      }
    });

    return sum;
  };

  return (
    <div className="spreadsheet">
      {/* Column Headers */}
      <div className="row header">
        <div className="cell-header corner"></div> {/* Empty corner cell */}
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div key={colIndex} className="cell-header column-header">
            {String.fromCharCode(65 + colIndex)} {/* Column letters (A, B, C...) */}
          </div>
        ))}
      </div>
      {/* Data Rows */}
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
