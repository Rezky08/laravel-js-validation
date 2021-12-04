import { isBoolean } from "lodash";
import { availableRules, validationResult } from ".";
import { resolveMessage } from "../messages";
import required from "./required";

export default ({ field, value, params }): validationResult => {
  let isValid = true;
  const field_value = value;
  let other = null;
  let other_value = null;

  for (let param of params) {
    const { value, current } = param;
    other = param.field;
    other_value = value ?? "exist";

    if (value ? value === current : !!current) {
      let requiredIsValid = required({ field: field, value: field_value });
      if (!requiredIsValid.valid) {
        isValid = false;
        break;
      }
    } else {
      isValid = false;
      break;
    }
  }

  return {
    valid: isValid,
    message:
      isValid === false
        ? resolveMessage(availableRules.required_if, {
            attribute: field,
            other: other,
            value: other_value,
          })
        : null,
  };
};
