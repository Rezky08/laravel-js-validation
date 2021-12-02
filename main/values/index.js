"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramMap = exports.ruleParamRequired = void 0;
var confirmed_1 = require("./confirmed");
var requiredIf_1 = require("./requiredIf");
var acceptedIf_1 = require("./acceptedIf");
var ruleParamRequired;
(function (ruleParamRequired) {
    ruleParamRequired["confirmed"] = "confirmed";
    ruleParamRequired["required_if"] = "required_if";
    ruleParamRequired["accepted_if"] = "accepted_if";
})(ruleParamRequired || (ruleParamRequired = {}));
exports.ruleParamRequired = ruleParamRequired;
var paramMap = {};
exports.paramMap = paramMap;
paramMap[ruleParamRequired.confirmed] = confirmed_1.paramMap;
paramMap[ruleParamRequired.required_if] = requiredIf_1.paramMap;
paramMap[ruleParamRequired.accepted_if] = acceptedIf_1.paramMap;
