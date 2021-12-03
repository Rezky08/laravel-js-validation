import { availableRules, validationResult } from ".";
import { resolveMessage } from "../messages";

export default ({ field, value }): validationResult => {
  let isValid = /^[a-zA-Z0-9\_\-]+$/.test(value);
  return {
    valid: isValid,
    message:
      isValid === false
        ? resolveMessage(availableRules.alpha_dash, { attribute: field })
        : null,
  };
};
