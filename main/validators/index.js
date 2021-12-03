"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.availableRules = void 0;
var required_1 = __importDefault(require("./required"));
var confirmed_1 = __importDefault(require("./confirmed"));
var requiredIf_1 = __importDefault(require("./requiredIf"));
var accepted_1 = __importDefault(require("./accepted"));
var acceptedIf_1 = __importDefault(require("./acceptedIf"));
var after_1 = __importDefault(require("./after"));
var before_1 = __importDefault(require("./before"));
var date_1 = __importDefault(require("./date"));
var alpha_1 = __importDefault(require("./alpha"));
var alphaDash_1 = __importDefault(require("./alphaDash"));
var alphaNum_1 = __importDefault(require("./alphaNum"));
var array_1 = __importDefault(require("./array"));
var afterOrEqual_1 = __importDefault(require("./afterOrEqual"));
var beforeOrEqual_1 = __importDefault(require("./beforeOrEqual"));
var availableRules;
(function (availableRules) {
    availableRules["required"] = "required";
    availableRules["required_if"] = "required_if";
    availableRules["confirmed"] = "confirmed";
    availableRules["accepted"] = "accepted";
    availableRules["accepted_if"] = "accepted_if";
    availableRules["date"] = "date";
    availableRules["after"] = "after";
    availableRules["after_or_equal"] = "after_or_equal";
    availableRules["before"] = "before";
    availableRules["before_or_equal"] = "before_or_equal";
    availableRules["alpha"] = "alpha";
    availableRules["alpha_dash"] = "alpha_dash";
    availableRules["alpha_num"] = "alpha_num";
    availableRules["array"] = "array";
})(availableRules || (availableRules = {}));
exports.availableRules = availableRules;
var rules = {};
rules[availableRules.required] = required_1.default;
rules[availableRules.required_if] = requiredIf_1.default;
rules[availableRules.confirmed] = confirmed_1.default;
rules[availableRules.accepted] = accepted_1.default;
rules[availableRules.accepted_if] = acceptedIf_1.default;
/** Date Validation */
rules[availableRules.date] = date_1.default;
rules[availableRules.after] = after_1.default;
rules[availableRules.after_or_equal] = afterOrEqual_1.default;
rules[availableRules.before] = before_1.default;
rules[availableRules.before_or_equal] = beforeOrEqual_1.default;
/** alpha validation */
rules[availableRules.alpha] = alpha_1.default;
rules[availableRules.alpha_dash] = alphaDash_1.default;
rules[availableRules.alpha_num] = alphaNum_1.default;
/** primitif data type validation */
rules[availableRules.array] = array_1.default;
var validate = function (value, rule) {
    var selectedRule = rules[rule];
    return selectedRule(value);
};
exports.validate = validate;
