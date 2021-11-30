enum confirmedParams {
  value = "value",
  value_confirmation = "value_confirmation",
}

const paramMap = (field: string, fields: Object) => {
  const retVal = {};
  retVal["value"] = fields[field];
  retVal["value_confirmation"] = fields[`${field}_confirmation`];
  return retVal;
};
export { paramMap, confirmedParams };
