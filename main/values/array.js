"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayParams = exports.paramMap = void 0;
var arrayParams;
(function (arrayParams) {
    arrayParams["field"] = "field";
    arrayParams["field_value"] = "value";
})(arrayParams || (arrayParams = {}));
exports.arrayParams = arrayParams;
var paramMap = function (field, value, fields, ruleParam) {
    var retVal = {};
    retVal[arrayParams.field] = field;
    retVal[arrayParams.field_value] = value;
    retVal["params"] = ruleParam;
    return retVal;
};
exports.paramMap = paramMap;
