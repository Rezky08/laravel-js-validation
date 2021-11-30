import { resolveMessage } from "./messages";
import { validate, availableRules, validationResult } from "./validators";
import { paramMap, ruleParamRequired } from "./values";
import React = require("react");

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

  getFields(): Object {
    return this.bind?.state?.fields;
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

  validateAll() {
    Object.entries(this.rules).forEach(([key, value]) => {
      this.validate(key, value);
    });
  }

  validate(field: string, value: any): validationResult {
    let result: validationResult = {
      valid: false,
      message: null,
    };
    if (typeof value === "string") {
      value = value.split("|");
    }

    let fieldValue = this.getFields();
    fieldValue = fieldValue[field];

    value?.forEach((rule: availableRules) => {
      let selectedRule = availableRules[this.getRule(rule)];

      if (!!selectedRule) {
        fieldValue = this.resolveValue(field, rule);

        result = validate(fieldValue, selectedRule);
        this.resolveError(field, rule, result, fieldValue);
      }
    });
    return result;
  }

  blurEventHandler(e: React.BaseSyntheticEvent, callback: Function) {
    const node: Element = e.currentTarget;
    let field = node?.getAttribute("name");
    let rule = this.rules[field];
    let result = this.validate(field, rule);
    callback(result);
  }
}
