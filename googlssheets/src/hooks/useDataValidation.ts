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
    func: DataQualityFunction,
    options?: { find?: string; replace?: string } // Options for FIND_AND_REPLACE
  ): string => {
    switch (func) {
      case "TRIM":
        return trim(value);
      case "UPPER":
        return upper(value);
      case "LOWER":
        return lower(value);
      case "REMOVE_DUPLICATES":
        return removeDuplicates(value.split(",")).join(","); // Ensure input is split into an array
      case "FIND_AND_REPLACE":
        if (options?.find && options?.replace) {
          return findAndReplace(value, options.find, options.replace);
        }
        console.warn("FIND_AND_REPLACE requires 'find' and 'replace' options");
        return value;
      default:
        return value;
    }
  };

  return {
    applyDataValidation,
  };
};
