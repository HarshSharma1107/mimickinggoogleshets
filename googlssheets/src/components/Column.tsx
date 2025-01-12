// components/Column.tsx
import React, { useState } from 'react';
import { Cell } from '../type';

interface ColumnProps {
  row: string;
  col: string;
  cell: Cell;
  updateCell: (row: string, col: string, value: string | number) => void;
}

const Column = ({ row, col, cell, updateCell }: ColumnProps) => {
  const [value, setValue] = useState(cell.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateCell(row, col, e.target.value);
  };

  return (
    <div className="cell">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={cell.isValid ? '' : 'invalid'}
      />
    </div>
  );
};

export default Column;
