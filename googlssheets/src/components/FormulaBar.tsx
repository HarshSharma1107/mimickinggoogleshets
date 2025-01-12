import React from "react";

interface FormulaBarProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void; // Add this prop
  cell: string;
}

const FormulaBar: React.FC<FormulaBarProps> = ({ value, onChange, onEnter, cell }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

  return (
    <div className="formula-bar">
      <div className="cell-info">{cell}</div>
      <input
        className="formula-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown} // Handle Enter key
        placeholder="Type your formula here"
      />
    </div>
  );
};

export default FormulaBar;
