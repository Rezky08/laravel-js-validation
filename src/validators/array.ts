import { includes, isBoolean } from "lodash";
import { availableRules, validationResult } from ".";
import { resolveMessage } from "../messages";

const allowTypes = [typeof {}, typeof []];

const validateNested = (field: string, fields: Array<any> | Object) => {};
const returnValue = (field: string, isValid: boolean): validationResult => {
  return {
    valid: isValid,
    message:
      isValid === false
        ? resolveMessage(availableRules.array, {
            attribute: field,
          })
        : null,
  };
};

export default ({ field, value, params }): validationResult => {
  let isValid = true;

  if (!allowTypes.includes(typeof value)) {
    isValid = false;
    return returnValue(field, isValid);
  }

  if (!!!params) {
    return returnValue(field, isValid);
  }

  let valueKeys: Array<string> = Array.isArray(value)
    ? value.map(([key, value]) => key)
    : Object.keys(value);

  for (let key of valueKeys) {
    if (!params.includes(key)) {
      isValid = false;
      return returnValue(field, isValid);
    }
  }
};
