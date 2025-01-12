// utils/dataValidation.ts

export const trim = (value: string): string => {
    return value.trim();
  };
  
  export const upper = (value: string): string => {
    return value.toUpperCase();
  };
  
  export const lower = (value: string): string => {
    return value.toLowerCase();
  };
  
  export const removeDuplicates = (array: any[]): any[] => {
    return Array.from(new Set(array));
  };
  
  export const findAndReplace = (text: string, search: string, replace: string): string => {
    return text.replace(new RegExp(search, 'g'), replace);
  };
  