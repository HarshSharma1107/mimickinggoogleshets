import React from 'react';

const FormulaBar = () => {
  return (
    <div className="formula-bar">
      <div className="cell-info">A1</div>
      <input className="formula-input" type="text" placeholder="Type your formula here" />
    </div>
  );
};

export default FormulaBar;
