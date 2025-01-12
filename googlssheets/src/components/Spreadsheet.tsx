import React from 'react';

const Spreadsheet = () => {
  const rows = 20;
  const columns = 10;

  return (
    <div className="spreadsheet">
      <div className="row header">
        <div className="cell-header"></div>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div key={colIndex} className="cell-header">
            {String.fromCharCode(65 + colIndex)} {/* Column letters (A, B, C...) */}
          </div>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          <div className="cell-header">{rowIndex + 1}</div>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="cell" contentEditable></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Spreadsheet;
