import { validate, availableRules, validationResult } from "./validators";
import { paramMap, ruleParamRequired } from "./values";
import React = require("react");
import _ = require("lodash");
import { get as getWild } from "get-wild";
export default class instanceValidation {
  bind: any;
  fieldsName: string;
  rules: Object;
  splittedRules: Object;
  errors: Object;
  messages: Object;
  labels: Object;

  constructor(bind, fieldsName: string = "fields") {
    this.bind = bind;
    this.fieldsName = fieldsName;
    this.errors = {};
    this.messages = {};
    this.splittedRules = {};
    this.labels = {};
  }

  splitRules() {
    Object.entries(this.rules).forEach(([fieldPath, rule]) => {
      let generalPath = this.getGeneralFieldPath(fieldPath);
      if (!!this.splittedRules[generalPath]) {
        this.splittedRules[generalPath].push(fieldPath);
      } else {
        this.splittedRules[generalPath] = [fieldPath];
      }
    });
  }

  useRules(rules: Object) {
    this.rules = rules;
    this.splitRules();
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
    return this.bind?.state ? this.bind?.state[this.fieldsName] : {};
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

  getGeneralFieldPath(fieldPath: string) {
    return this.splitFieldPath(fieldPath)
      .filter((value) => !!value)
      .join(".");
  }

  splitFieldPath(fieldPath: string) {
    return fieldPath
      .split(".*")
      .map((value) => value.replace(/^\.+|\.+$/g, ""));
  }

  validateNestedWithIndex(
    fieldValue: any,
    keys: Array<string>,
    currentPaths: Array<string> = [],
    callback: Function = (fieldPath: string, value: any) => {}
  ) {
    let key = keys[0];
    keys = keys.slice(1);

    if (Array.isArray(fieldValue) && fieldValue.length > 0) {
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
    Object.entries(this.rules).forEach(([fieldPath, fieldRules]) => {
      this.validate(fieldPath, fieldRules);
    });
  }

  validateProcess(
    fieldPath: string,
    fieldValue: any,
    rule: availableRules,
    selectedRule: availableRules
  ): validationResult {
    let fieldLabel = getWild(this.labels, this.getGeneralFieldPath(fieldPath));

    fieldValue = this.resolveValue(fieldLabel ?? fieldPath, fieldValue, rule);
    let result = validate(fieldValue, selectedRule);
    this.resolveError(fieldPath, rule, result, fieldValue);
    return result;
  }

  validate(
    fieldPath: string,
    rules?: string | Array<string>
  ): validationResult[] {
    let result: Array<validationResult> = [];
    let arrayRules: Array<string> = [];

    if (typeof rules == "string") {
      arrayRules = rules.split("|");
    } else {
      arrayRules = rules;
    }

    this.validateNestedWithIndex(
      this.getFields(),
      this.splitFieldPath(fieldPath),
      [],
      (field: string, value: any) =>
        arrayRules.forEach((rule: availableRules) => {
          let selectedRule = availableRules[this.getRule(rule)];
          if (!!selectedRule) {
            result.push(this.validateProcess(field, value, rule, selectedRule));
          }
        })
    );

    return result;
  }

  eventHandler(
    e?: React.BaseSyntheticEvent,
    fieldPath?: string,
    callback: Function = (results: Array<validationResult>) => {}
  ) {
    const node: Element = e?.currentTarget;
    let field = fieldPath ?? node?.getAttribute("name");
    let generalField = this.getGeneralFieldPath(field);
    let ruleFields: Array<string> = this.splittedRules[generalField];
    let result: Array<validationResult> = [];
    ruleFields.forEach((ruleField) => {
      let validationResult = this.validate(
        ruleField,
        this.getRuleByField(ruleField)
      );
      result.push(...validationResult);
    });

    if (typeof callback === "function") {
      callback(result);
    }
  }
}
