import Required from "./required";
import Confirmed from "./confirmed";
enum availableRules {
  required = "required",
  confirmed = "confirmed",
}

const rules = {};
rules[availableRules.required] = Required;
rules[availableRules.confirmed] = Confirmed;

const validate = (value: any, rule: availableRules): boolean => {
  let selectedRule = rules[rule];
  return selectedRule(value);
};
export { availableRules, validate };
