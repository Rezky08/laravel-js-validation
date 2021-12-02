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
var availableRules;
(function (availableRules) {
    availableRules["required"] = "required";
    availableRules["required_if"] = "required_if";
    availableRules["confirmed"] = "confirmed";
    availableRules["accepted"] = "accepted";
    availableRules["accepted_if"] = "accepted_if";
})(availableRules || (availableRules = {}));
exports.availableRules = availableRules;
var rules = {};
rules[availableRules.required] = required_1.default;
rules[availableRules.required_if] = requiredIf_1.default;
rules[availableRules.confirmed] = confirmed_1.default;
rules[availableRules.accepted] = accepted_1.default;
rules[availableRules.accepted_if] = acceptedIf_1.default;
var validate = function (value, rule) {
    var selectedRule = rules[rule];
    return selectedRule(value);
};
exports.validate = validate;
