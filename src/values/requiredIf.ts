enum requiredIfParams {
  field = "field",
  field_value = "value",
  other_field = "other_field",
  other_value = "other_value",
}

const paramMap = (field: string, fields: Object, ruleParam?: Array<string>) => {
  const retVal = {};
  retVal[requiredIfParams.field] = field;
  retVal[requiredIfParams.field_value] = fields[field];

  retVal["params"] = [];
  while (ruleParam.length > 0) {
    let other_field = ruleParam.shift();
    let other_field_value = ruleParam.shift();
    let other_field_current_value = fields[other_field];
    retVal["params"].push({
      field: other_field,
      value: other_field_value,
      current: other_field_current_value,
    });
  }

  return retVal;
};
export { paramMap, requiredIfParams };
