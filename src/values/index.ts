import { availableRules } from "../validators";
import { paramMap as confirmedParamMap } from "./confirmed";
import { paramMap as requiredIfParams } from "./requiredIf";
import { paramMap as acceptedIfParams } from "./acceptedIf";
import { paramMap as afterParams } from "./after";

enum ruleParamRequired {
  confirmed = availableRules.confirmed,
  required_if = availableRules.required_if,
  accepted_if = availableRules.accepted_if,
  after = availableRules.after,
}
const paramMap = {};
paramMap[ruleParamRequired.confirmed] = confirmedParamMap;
paramMap[ruleParamRequired.required_if] = requiredIfParams;
paramMap[ruleParamRequired.accepted_if] = acceptedIfParams;
paramMap[ruleParamRequired.after] = afterParams;

export { ruleParamRequired, paramMap };
