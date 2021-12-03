"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateComparisonParams = exports.paramMap = void 0;
var get_wild_1 = require("get-wild");
var lodash_1 = require("lodash");
var dateComparisonParams;
(function (dateComparisonParams) {
    dateComparisonParams["value"] = "value";
})(dateComparisonParams || (dateComparisonParams = {}));
exports.dateComparisonParams = dateComparisonParams;
var paramMap = function (field, value, fields, ruleParam) {
    var retVal = {};
    var param = ruleParam.shift();
    var isField = (0, lodash_1.has)(fields, param);
    retVal["field"] = field;
    retVal["value"] = new Date(value);
    retVal["param"] = {
        field: isField ? param : undefined,
        value: isField ? new Date((0, get_wild_1.get)(fields, param)) : new Date(param),
    };
    return retVal;
};
exports.paramMap = paramMap;
