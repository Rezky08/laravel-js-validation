import { availableRules, validationResult } from ".";
import { resolveMessage } from "../messages";
import accepted from "./accepted";
import _if from "./if";

export default (props: Object): validationResult => {
  return _if(props, availableRules.accepted_if, accepted);
};
