enum acceptedParams {
  value = "value",
}

const availableValues = ["yes", "on", 1, true];

const castValue = (value: any) => {
  return availableValues.includes(value);
};

const paramMap = (field: string, value: any, fields: Object) => {
  const retVal = {};
  retVal["field"] = field;
  retVal["value"] = castValue(value);
  return retVal;
};
export { paramMap, acceptedParams };
