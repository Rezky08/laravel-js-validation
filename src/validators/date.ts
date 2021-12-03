import { availableRules, validationResult } from ".";
import { resolveMessage } from "../messages";

export default ({ field, value }): validationResult => {
  let isValid = new Date(value).toString() !== "Invalid Date";

  return {
    valid: isValid,
    message:
      isValid === false
        ? resolveMessage(availableRules.date, {
            attribute: field,
          })
        : null,
  };
};
