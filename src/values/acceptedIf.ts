import { paramMap as ifParamMap } from "./if";
enum acceptedParams {
  value = "value",
}

const availableValues = ["yes", "on", 1, true];

const castValue = (value: any) => {
  return availableValues.includes(value);
};

const paramMap = (
  field: string,
  value: any,
  fields: Object,
  ruleParam?: Array<string>
) => {
  const retVal = {};
  retVal["field"] = field;
  retVal["value"] = castValue(value);
  return ifParamMap(retVal["field"], retVal["value"], fields, ruleParam);
};
export { paramMap, acceptedParams };
