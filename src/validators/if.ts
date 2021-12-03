import { availableRules, validationResult } from ".";
import { resolveMessage } from "../messages";

export default (
  props: any,
  rule: availableRules,
  validationCallback: Function = (value: any) => {},
  castCallback: Function = (value: any) => {}
): validationResult => {
  const { field, value, params } = props;
  let isValid = true;
  const field_value = value;
  let other = null;
  let other_value = null;

  for (let param of params) {
    const { value, current } = param;
    let valueCasted = castCallback(value) ?? value;

    if (valueCasted ? valueCasted === current : !!current) {
      let callbackIsValid = validationCallback(props);

      if (!callbackIsValid.valid) {
        other = param.field;
        other_value = valueCasted ? param.value : "exist";
        isValid = false;
        break;
      }
    }
  }

  return {
    valid: isValid,
    message:
      isValid === false
        ? resolveMessage(rule, {
            attribute: field,
            other: other,
            value: other_value,
          })
        : null,
  };
};
