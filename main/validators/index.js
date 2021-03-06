"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.availableRules = void 0;
var required_1 = require("./required");
var confirmed_1 = require("./confirmed");
var availableRules;
(function (availableRules) {
    availableRules["required"] = "required";
    availableRules["confirmed"] = "confirmed";
})(availableRules || (availableRules = {}));
exports.availableRules = availableRules;
var rules = {};
rules[availableRules.required] = required_1.default;
rules[availableRules.confirmed] = confirmed_1.default;
var validate = function (value, rule) {
    var selectedRule = rules[rule];
    return selectedRule(value);
};
exports.validate = validate;
