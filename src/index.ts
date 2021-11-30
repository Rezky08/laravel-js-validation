import { resolveMessage } from "./messages";
import { validate, availableRules } from "./validators";
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

  getRules() {
    // console.log(this.rules);
  }

  resolveValue(field: string, rule: availableRules) {
    const fields = this.bind?.state?.fields;
    // require param
    let requireParam = ruleParamRequired[rule];
    if (!!requireParam) {
      requireParam = paramMap[requireParam];
    } else {
      return fields[field];
    }
    return requireParam(field, fields);
  }

  resolveError(field: string, rule: availableRules, validationResult: boolean) {
    if (!validationResult) {
      const message = resolveMessage(rule, { attribute: field });
      this.errors[field] = message;
      this.setError(field, rule, message);
    }
  }

  setError(field: string, rule: availableRules, message: string): void {
    if (typeof this.bind.setState === "function") {
      this.bind.setState({ errors: this.errors });
    }
  }

  validate(): boolean {
    this.getRules();

    Object.entries(this.rules).forEach(([key, value]) => {
      if (typeof value === "string") {
        value = value.split("|");
      }

      let fieldValue = this.bind?.state?.fields;
      fieldValue = fieldValue[key];

      value.forEach((rule: availableRules) => {
        let selectedRule = availableRules[rule];

        if (!!selectedRule) {
          fieldValue = this.resolveValue(key, rule);

          let result = validate(fieldValue, selectedRule);
          this.resolveError(key, rule, result);
        }
      });
    });
    return false;
  }

  blurEventHandler() {
    this.validate();
  }
}
