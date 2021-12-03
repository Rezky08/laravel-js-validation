import { availableRules } from "../validators";
import { paramMap as confirmedParamMap } from "./confirmed";
import { paramMap as requiredIfParams } from "./requiredIf";
import { paramMap as acceptedIfParams } from "./acceptedIf";
import { paramMap as afterParams } from "./after";
import { paramMap as beforeParams } from "./before";
import { paramMap as arrayParams } from "./array";
import { paramMap as afterOrEqualParams } from "./afterOrEqual";
import { paramMap as beforeOrEqualParams } from "./beforeOrEqual";

enum ruleParamRequired {
  confirmed = availableRules.confirmed,
  required_if = availableRules.required_if,
  accepted_if = availableRules.accepted_if,
  after = availableRules.after,
  after_or_equal = availableRules.after_or_equal,
  before = availableRules.before,
  before_or_equal = availableRules.before_or_equal,
  array = availableRules.array,
}
const paramMap = {};
paramMap[ruleParamRequired.confirmed] = confirmedParamMap;
paramMap[ruleParamRequired.required_if] = requiredIfParams;
paramMap[ruleParamRequired.accepted_if] = acceptedIfParams;
paramMap[ruleParamRequired.after] = afterParams;
paramMap[ruleParamRequired.after_or_equal] = afterOrEqualParams;
paramMap[ruleParamRequired.before] = beforeParams;
paramMap[ruleParamRequired.before_or_equal] = beforeOrEqualParams;
paramMap[ruleParamRequired.array] = arrayParams;

export { ruleParamRequired, paramMap };
