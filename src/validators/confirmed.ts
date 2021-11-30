import { availableRules, validationResult } from ".";
import { resolveMessage } from "../messages";

export default ({ field, value, value_confirmation }): validationResult => {
  let isValid = value === value_confirmation;
  return {
    valid: isValid,
    message:
      isValid === false
        ? resolveMessage(availableRules.confirmed, { attribute: field })
        : null,
  };
};
