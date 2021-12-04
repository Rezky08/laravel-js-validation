import { get as getWild } from "get-wild";

const castToBool = (value: string): any => {
  const trueBool = ["true", "1"];
  const falseBool = ["false", "0"];
  value = value?.toLowerCase();

  switch (true) {
    case trueBool.includes(value):
      return true;
    case falseBool.includes(value):
      return false;
    default:
      return value;
  }
};

enum requiredIfParams {
  field = "field",
  field_value = "value",
  other_field = "other_field",
  other_value = "other_value",
}

const paramMap = (
  field: string,
  value: any,
  fields: Object,
  ruleParam?: Array<string>
) => {
  const retVal = {};
  retVal[requiredIfParams.field] = field;
  retVal[requiredIfParams.field_value] = value;

  retVal["params"] = [];
  while (ruleParam.length > 0) {
    let other_field = ruleParam.shift();
    let other_field_value = ruleParam.shift();
    let other_field_current_value = getWild(fields, other_field);
    retVal["params"].push({
      field: other_field,
      value: castToBool(other_field_value),
      current: other_field_current_value,
    });
  }

  return retVal;
};
export { paramMap, requiredIfParams };
