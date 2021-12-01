import { get as getWild } from "get-wild";

enum confirmedParams {
  value = "value",
  value_confirmation = "value_confirmation",
}

const paramMap = (field: string, value: any, fields: Object) => {
  const retVal = {};
  retVal["field"] = field;
  retVal["value"] = value;
  retVal["value_confirmation"] = getWild(fields, `${field}_confirmation`);
  return retVal;
};
export { paramMap, confirmedParams };
