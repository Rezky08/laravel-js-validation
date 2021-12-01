import { validate, availableRules, validationResult } from "./validators";
import { paramMap, ruleParamRequired } from "./values";
import React = require("react");
import _ = require("lodash");
import { get as getWild } from "get-wild";
export default class instanceValidation {
  bind: any;
  fieldsName: string;
  rules: Object;
  errors: Object;
  messages: Object;
  labels: Object;

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

  useLabels(labels: Object) {
    this.labels = labels;
  }

  getField(fieldPath: string): any {
    return getWild(this.getFields(), fieldPath);
  }

  getFields(): Object {
    return this.bind?.state?.fields;
  }

  getRuleByField(fieldPath: string) {
    return this.rules[fieldPath];
  }

  getRule(rule: string) {
    let onlyRule = rule?.split(":")[0];
    return onlyRule;
  }

  getRuleParam(rule: string) {
    let onlyParam = rule?.split(":")[1];
    return onlyParam?.split(",");
  }

  resolveValue(fieldPath: string, value: any, rule: availableRules) {
    // require param
    let requireParam = ruleParamRequired[this.getRule(rule)];
    if (!!requireParam) {
      requireParam = paramMap[requireParam];
    } else {
      return {
        field: fieldPath,
        value: value,
      };
    }
    const requireParamFunction = requireParam.bind(this);
    return requireParamFunction(
      fieldPath,
      value,
      this.getFields(),
      this.getRuleParam(rule)
    );
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

  validateNestedWithIndex(
    fieldValue: any,
    keys: Array<string>,
    currentPaths: Array<string> = [],
    callback: Function = (fieldPath: string, value: any) => {}
  ) {
    let key = keys[0];
    keys = keys.slice(1);

    if (Array.isArray(fieldValue)) {
      fieldValue.forEach((fieldElement, fieldKey) => {
        let currentPath = key ? `${fieldKey}.${key}` : fieldKey.toString();

        this.validateNestedWithIndex(
          getWild(fieldValue, currentPath),
          keys,
          [...currentPaths, currentPath],
          callback
        );
      });
    } else if (key) {
      currentPaths.push(key);
      this.validateNestedWithIndex(
        getWild(fieldValue, key),
        keys,
        currentPaths,
        callback
      );
    } else {
      let fieldPath = currentPaths.join(".");
      callback(fieldPath, fieldValue);
    }
  }

  validateAll() {
    Object.entries(this.rules).forEach(([key]) => {
      this.validate(key);
    });
  }

  validateProcess(
    fieldPath: string,
    fieldValue: any,
    rule: availableRules,
    selectedRule: availableRules
  ): validationResult {
    fieldValue = this.resolveValue(fieldPath, fieldValue, rule);
    let result = validate(fieldValue, selectedRule);
    this.resolveError(fieldPath, rule, result, fieldValue);
    return result;
  }

  validate(fieldPath: string): validationResult {
    let result: validationResult = {
      valid: false,
      message: null,
    };
    let rules = this.getRuleByField(fieldPath);

    if (typeof rules === "string") {
      rules = rules.split("|");
    }

    let fieldValue = this.getFields();
    let fieldPaths = fieldPath.split(".*.");
    console.log(fieldPaths);

    fieldValue = getWild(fieldValue, fieldPath);

    rules?.forEach((rule: availableRules) => {
      let selectedRule = availableRules[this.getRule(rule)];

      if (!!selectedRule) {
        if (Array.isArray(fieldValue) && fieldValue?.length > 0) {
          fieldValue.forEach((value, key) => {
            result = this.validateProcess(
              fieldPath.replace("*", key.toString()),
              value,
              rule,
              selectedRule
            );
          });
        } else {
          result = this.validateProcess(
            fieldPath,
            fieldValue,
            rule,
            selectedRule
          );
        }
      }
    });
    return result;
  }

  eventHandler(
    e?: React.BaseSyntheticEvent,
    fieldName?: string,
    callback?: Function
  ) {
    const node: Element = e?.currentTarget;
    let field = fieldName ?? node?.getAttribute("name");
    let result = this.validate(field);
    if (typeof callback === "function") {
      callback(result);
    }
  }
}
