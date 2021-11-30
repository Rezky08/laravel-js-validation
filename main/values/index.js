"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramMap = exports.ruleParamRequired = void 0;
var validators_1 = require("../validators");
var confirmed_1 = require("./confirmed");
var ruleParamRequired;
(function (ruleParamRequired) {
    ruleParamRequired["confirmed"] = "confirmed";
})(ruleParamRequired || (ruleParamRequired = {}));
exports.ruleParamRequired = ruleParamRequired;
var paramMap = {};
exports.paramMap = paramMap;
paramMap[validators_1.availableRules.confirmed] = confirmed_1.paramMap;
