import Required from "./required";
import Confirmed from "./confirmed";
import RequiredIf from "./requiredIf";
import Accepted from "./accepted";
import AcceptedIf from "./acceptedIf";
import After from "./after";
import Before from "./before";
import Date from "./date";
enum availableRules {
  required = "required",
  required_if = "required_if",
  confirmed = "confirmed",
  accepted = "accepted",
  accepted_if = "accepted_if",
  date = "date",
  after = "after",
  before = "before",
}
interface validationResult {
  valid: boolean;
  message: string;
}

const rules = {};
rules[availableRules.required] = Required;
rules[availableRules.required_if] = RequiredIf;
rules[availableRules.confirmed] = Confirmed;
rules[availableRules.accepted] = Accepted;
rules[availableRules.accepted_if] = AcceptedIf;
rules[availableRules.date] = Date;
rules[availableRules.after] = After;
rules[availableRules.before] = Before;

const validate = (value: any, rule: availableRules): validationResult => {
  let selectedRule = rules[rule];
  return selectedRule(value);
};
export { availableRules, validate, validationResult };
