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
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Spreadsheet;
