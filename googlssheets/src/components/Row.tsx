// components/Row.tsx
import React from 'react';
import { Cell } from '../type';
import Column from './Column';

interface RowProps {
  row: string;
  data: Cell[];
  updateCell: (row: string, col: string, value: string | number) => void;
}

const Row = ({ row, data, updateCell }: RowProps) => {
  return (
    <div className="row">
      {data.map((cell, colIndex) => (
        <Column
          key={colIndex}
          row={row}
          col={colIndex.toString()}
          cell={cell}
          updateCell={updateCell}
        />
      ))}
    </div>
  );
};

export default Row;
