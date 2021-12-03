import { get as getWild } from "get-wild";

enum arrayParams {
  field = "field",
  field_value = "value",
}

const paramMap = (
  field: string,
  value: any,
  fields: Object,
  ruleParam?: Array<string>
) => {
  const retVal = {};
  retVal[arrayParams.field] = field;
  retVal[arrayParams.field_value] = value;
  retVal["params"] = ruleParam;

  return retVal;
};
export { paramMap, arrayParams };
