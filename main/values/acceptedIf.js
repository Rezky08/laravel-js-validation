"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptedParams = exports.paramMap = void 0;
var if_1 = require("./if");
var acceptedParams;
(function (acceptedParams) {
    acceptedParams["value"] = "value";
})(acceptedParams || (acceptedParams = {}));
exports.acceptedParams = acceptedParams;
var availableValues = ["yes", "on", 1, true];
var castValue = function (value) {
    return availableValues.includes(value);
};
var paramMap = function (field, value, fields, ruleParam) {
    var retVal = {};
    retVal["field"] = field;
    retVal["value"] = castValue(value);
    return (0, if_1.paramMap)(retVal["field"], retVal["value"], fields, ruleParam);
};
exports.paramMap = paramMap;
