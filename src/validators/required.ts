import { availableRules, validationResult } from ".";
import { resolveMessage } from "../messages";

const emptyList = [null, undefined, "", [], {}];

const validate = (value: any): boolean => {
  return !emptyList.includes(value);
};

const validateArray = (values: Array<any>): boolean => {
  switch (true) {
    case values.length <= 0:
      return false;

    case values.filter((value) => !!!value).length > 0:
      return false;

    default:
      return true;
  }
};

export default ({ field, value }): validationResult => {
  let isValid = true;

  if (Array.isArray(value)) {
    isValid = validateArray(value);
  } else {
    isValid = validate(value);
  }

  return {
    valid: isValid,
    message:
      isValid === false
        ? resolveMessage(availableRules.required, { attribute: field })
        : null,
  };
};
