import Required from "./required";
import Confirmed from "./confirmed";
import RequiredIf from "./requiredIf";
enum availableRules {
  required = "required",
  required_if = "required_if",
  confirmed = "confirmed",
}
interface validationResult {
  valid: boolean;
  message: string;
}

const rules = {};
rules[availableRules.required] = Required;
rules[availableRules.required_if] = RequiredIf;
rules[availableRules.confirmed] = Confirmed;

const validate = (value: any, rule: availableRules): validationResult => {
  let selectedRule = rules[rule];
  return selectedRule(value);
};
export { availableRules, validate, validationResult };
