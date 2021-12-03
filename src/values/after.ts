enum afterParams {
  value = "value",
}

const paramMap = (
  field: string,
  value: any,
  fields: Object,
  ruleParam?: Array<string>
) => {
  const retVal = {};
  retVal["field"] = field;
  retVal["value"] = new Date(value);
  retVal["param"] = new Date(ruleParam.shift());
  return retVal;
};
export { paramMap, afterParams };
