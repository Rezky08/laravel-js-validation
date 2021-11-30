import { resolveMessage } from "./messages";
import { validate, availableRules, validationResult } from "./validators";
import { paramMap, ruleParamRequired } from "./values";

export default class instanceValidation {
  bind: any;
  fieldsName: string;
  rules: Object;
  errors: Object;
  messages: Object;

  constructor(bind, fieldsName: string = "fields") {
    this.bind = bind;
    this.fieldsName = fieldsName;
    this.errors = {};
    this.messages = {};
  }

  useRules(rules: Object) {
    this.rules = rules;
  }

  useMessages(messages: Object) {
    this.messages = messages;
  }

  getRule(rule: string) {
    let onlyRule = rule?.split(":")[0];
    return onlyRule;
  }

  getRuleParam(rule: string) {
    let onlyParam = rule?.split(":")[1];
    return onlyParam?.split(",");
  }

  resolveValue(field: string, rule: availableRules) {
    const fields = this.bind?.state?.fields;
    // require param
    let requireParam = ruleParamRequired[this.getRule(rule)];
    if (!!requireParam) {
      requireParam = paramMap[requireParam];
    } else {
      return {
        field: field,
        value: fields[field],
      };
    }
    return requireParam(field, fields, this.getRuleParam(rule));
  }

  resolveError(
    field: string,
    rule: availableRules,
    validationResult: validationResult,
    fieldValue?: Object
  ) {
    if (!validationResult.valid) {
      this.errors[field] = validationResult.message;
      this.setError(field, rule, validationResult.message);
    } else {
      delete this.errors[field];
      this.setError(null, null, "unset");
    }
  }

  setError(field?: string, rule?: availableRules, message?: string): void {
    if (typeof this.bind.setState === "function") {
      this.bind.setState({ errors: this.errors });
    }
  }

  validate(): boolean {
    Object.entries(this.rules).forEach(([key, value]) => {
      if (typeof value === "string") {
        value = value.split("|");
      }

      let fieldValue = this.bind?.state?.fields;
      fieldValue = fieldValue[key];

      value.forEach((rule: availableRules) => {
        let selectedRule = availableRules[this.getRule(rule)];

        if (!!selectedRule) {
          fieldValue = this.resolveValue(key, rule);

          let result = validate(fieldValue, selectedRule);
          this.resolveError(key, rule, result, fieldValue);
        }
      });
    });
    return false;
  }

  blurEventHandler() {
    this.validate();
  }
}
