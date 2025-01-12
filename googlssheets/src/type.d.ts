
export interface Cell {
    value: string | number;
    formula?: string;
    isValid: boolean;
  }
  
  export interface Spreadsheet {
    [key: string]: Cell[];
  }
  
  export type MathFunction = 'SUM' | 'AVERAGE' | 'MAX' | 'MIN' | 'COUNT';
  export type DataQualityFunction = 'TRIM' | 'UPPER' | 'LOWER' | 'REMOVE_DUPLICATES' | 'FIND_AND_REPLACE';
  