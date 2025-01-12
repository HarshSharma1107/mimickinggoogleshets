// hooks/useDataValidation.ts
import {
  trim,
  upper,
  lower,
  removeDuplicates,
  findAndReplace,
} from "../utils/dataQualityFunctions";
import { DataQualityFunction } from "../type";

export const useDataValidation = () => {
  const applyDataValidation = (
    value: string,
    func: DataQualityFunction
  ): string => {
    switch (func) {
      case "TRIM":
        return trim(value);
      case "UPPER":
        return upper(value);
      case "LOWER":
        return lower(value);
      case "REMOVE_DUPLICATES":
        return removeDuplicates(value.split(",")).join(",");
      case "FIND_AND_REPLACE":
        return findAndReplace(value, "find", "replace"); // Example
      default:
        return value;
    }
  };

  return {
    applyDataValidation,
  };
};
