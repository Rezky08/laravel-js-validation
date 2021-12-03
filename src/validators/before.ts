import { availableRules, validationResult } from ".";
import { resolveMessage } from "../messages";
import date from "./date";

const dateValidation = ({ field, value, param }): validationResult => {
  // date validation
  let isDateValid = date({ field, value });
  if (!isDateValid.valid) {
    return isDateValid;
  }
  isDateValid = date({
    field: param.field ?? `${field}.${availableRules.before}`,
    value: param.value,
  });
  return isDateValid;
};

export default (props: any): validationResult => {
  const { field, value, param } = props;
  let isDateValid = dateValidation(props);

  if (!isDateValid.valid) {
    return isDateValid;
  }

  let isValid = value < param?.value;

  return {
    valid: isValid,
    message:
      isValid === false
        ? resolveMessage(availableRules.before, {
            attribute: field,
            date: param.field ?? param.value,
          })
        : null,
  };
};
