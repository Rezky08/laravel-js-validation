import { availableRules, validationResult } from ".";
import { resolveMessage } from "../messages";

export default ({ field, value }): validationResult => {
  let isValid = value === true;
  return {
    valid: isValid,
    message:
      isValid === false
        ? resolveMessage(availableRules.accepted, { attribute: field })
        : null,
  };
};