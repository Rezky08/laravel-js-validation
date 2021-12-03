import { availableRules } from "../validators";
import { paramMap as confirmedParamMap } from "./confirmed";
import { paramMap as requiredIfParams } from "./requiredIf";
import { paramMap as acceptedIfParams } from "./acceptedIf";

enum ruleParamRequired {
  confirmed = availableRules.confirmed,
  required_if = availableRules.required_if,
  accepted_if = availableRules.accepted_if,
}
const paramMap = {};
paramMap[ruleParamRequired.confirmed] = confirmedParamMap;
paramMap[ruleParamRequired.required_if] = requiredIfParams;
paramMap[ruleParamRequired.accepted_if] = acceptedIfParams;

export { ruleParamRequired, paramMap };
