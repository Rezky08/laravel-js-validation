import { availableRules } from "../validators";
import { paramMap as confirmedParamMap } from "./confirmed";
import { paramMap as requiredIfParams } from "./requiredIf";

enum ruleParamRequired {
  confirmed = availableRules.confirmed,
  required_if = availableRules.required_if,
}
const paramMap = {};
paramMap[ruleParamRequired.confirmed] = confirmedParamMap;
paramMap[ruleParamRequired.required_if] = requiredIfParams;

export { ruleParamRequired, paramMap };
