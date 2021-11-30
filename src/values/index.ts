import { availableRules } from "../validators";
import { paramMap as confirmedParamMap } from "./confirmed";

enum ruleParamRequired {
  confirmed = availableRules.confirmed,
}
const paramMap = {};
paramMap[availableRules.confirmed] = confirmedParamMap;

export { ruleParamRequired, paramMap };
