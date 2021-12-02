import { get as getWild } from "get-wild";

enum ifParams {
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
  retVal[ifParams.field] = field;
  retVal[ifParams.field_value] = value;

  retVal["params"] = [];
  while (ruleParam.length > 0) {
    let other_field = ruleParam.shift();
    let other_field_value = ruleParam.shift();
    let other_field_current_value = getWild(fields, other_field);
    retVal["params"].push({
      field: other_field,
      value: other_field_value,
      current: other_field_current_value,
    });
  }

  return retVal;
};
export { paramMap, ifParams };
