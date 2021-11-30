import { availableRules, validationResult } from ".";
import { resolveMessage } from "../messages";

export default ({ field, value }): validationResult => {
  let isValid = !!value;
  return {
    valid: isValid,
    message:
      isValid === false
        ? resolveMessage(availableRules.required, { attribute: field })
        : null,
  };
};
