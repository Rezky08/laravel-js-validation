import Required from "./required";
import Confirmed from "./confirmed";
import RequiredIf from "./requiredIf";
import Accepted from "./accepted";
import AcceptedIf from "./acceptedIf";
import After from "./after";
import Before from "./before";
import Date from "./date";
import Alpha from "./alpha";
import AlphaDash from "./alphaDash";
import AlphaNum from "./alphaNum";
import Array from "./array";
import AfterOrEqual from "./afterOrEqual";
import BeforeOrEqual from "./beforeOrEqual";

enum availableRules {
  required = "required",
  required_if = "required_if",
  confirmed = "confirmed",
  accepted = "accepted",
  accepted_if = "accepted_if",
  date = "date",
  after = "after",
  after_or_equal = "after_or_equal",
  before = "before",
  before_or_equal = "before_or_equal",
  alpha = "alpha",
  alpha_dash = "alpha_dash",
  alpha_num = "alpha_num",
  array = "array",
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
/** Date Validation */
rules[availableRules.date] = Date;
rules[availableRules.after] = After;
rules[availableRules.after_or_equal] = AfterOrEqual;
rules[availableRules.before] = Before;
rules[availableRules.before_or_equal] = BeforeOrEqual;
/** alpha validation */
rules[availableRules.alpha] = Alpha;
rules[availableRules.alpha_dash] = AlphaDash;
rules[availableRules.alpha_num] = AlphaNum;
/** primitif data type validation */
rules[availableRules.array] = Array;

const validate = (value: any, rule: availableRules): validationResult => {
  let selectedRule = rules[rule];
  return selectedRule(value);
};
export { availableRules, validate, validationResult };
