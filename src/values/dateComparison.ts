import { get as getWild } from "get-wild";
import { has } from "lodash";

enum dateComparisonParams {
  value = "value",
}

const paramMap = (
  field: string,
  value: any,
  fields: Object,
  ruleParam?: Array<string>
) => {
  const retVal = {};
  let param = ruleParam.shift();
  let isField = has(fields, param);
  retVal["field"] = field;
  retVal["value"] = new Date(value);
  retVal["param"] = {
    field: isField ? param : undefined,
    value: isField ? new Date(getWild(fields, param)) : new Date(param),
  };
  return retVal;
};
export { paramMap, dateComparisonParams };
