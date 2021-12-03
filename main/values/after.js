"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.afterParams = exports.paramMap = void 0;
var afterParams;
(function (afterParams) {
    afterParams["value"] = "value";
})(afterParams || (afterParams = {}));
exports.afterParams = afterParams;
var paramMap = function (field, value, fields, ruleParam) {
    var retVal = {};
    retVal["field"] = field;
    retVal["value"] = new Date(value);
    retVal["param"] = new Date(ruleParam.shift());
    return retVal;
};
exports.paramMap = paramMap;
