import { isBoolean } from "lodash";
import { availableRules, validationResult } from ".";
import { resolveMessage } from "../messages";
import required from "./required";

const castToBool = (value: string): boolean => {
  const trueBool = ["true", "1"];
  const falseBool = ["false", "0"];
  value = value.toLowerCase();

  switch (true) {
    case trueBool.includes(value):
      return true;
    case falseBool.includes(value):
      return false;
    default:
      return undefined;
  }
};

export default ({ field, value, params }): validationResult => {
  let isValid = true;
  const field_value = value;
  let other = null;
  let other_value = null;

  for (let param of params) {
    const { value, current } = param;
    let valueCasted = castToBool(value) ?? value;

    if (valueCasted === current) {
      let requiredIsValid = required({ field: field, value: field_value });

      if (!requiredIsValid.valid) {
        other = param.field;
        other_value = param.value;
        isValid = false;
        break;
      }
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
