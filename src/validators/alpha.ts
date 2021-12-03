import { availableRules, validationResult } from ".";
import { resolveMessage } from "../messages";

export default ({ field, value }): validationResult => {
  console.log(value);
  let isValid = /^[a-zA-Z]+$/.test(value);
  return {
    valid: isValid,
    message:
      isValid === false
        ? resolveMessage(availableRules.alpha, { attribute: field })
        : null,
  };
};
