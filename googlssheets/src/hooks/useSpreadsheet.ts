import { useState } from "react";
import { Spreadsheet } from "../type";

export const useSpreadsheet = () => {
  const [spreadsheet, setSpreadsheet] = useState<Spreadsheet>({});

  const updateCell = (row: string, col: string, value: string | number) => {
    setSpreadsheet((prev: any) => ({
      ...prev,
      [row]: {
        ...prev[row],
        [col]: {
          value,
          isValid: true,
        },
      },
    }));
  };

  const deleteRow = (row: string) => {
    setSpreadsheet((prev: any) => {
      const newSpreadsheet = { ...prev };
      delete newSpreadsheet[row];
      return newSpreadsheet;
    });
  };

  const deleteColumn = (col: string) => {
    setSpreadsheet((prev: any) => {
      const newSpreadsheet = { ...prev };
      for (let row in newSpreadsheet) {
        delete newSpreadsheet[row][col];
      }
      return newSpreadsheet;
    });
  };

  return {
    spreadsheet,
    updateCell,
    deleteRow,
    deleteColumn,
  };
};
