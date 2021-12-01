"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredIfParams = exports.paramMap = void 0;
var get_wild_1 = require("get-wild");
var requiredIfParams;
(function (requiredIfParams) {
    requiredIfParams["field"] = "field";
    requiredIfParams["field_value"] = "value";
    requiredIfParams["other_field"] = "other_field";
    requiredIfParams["other_value"] = "other_value";
})(requiredIfParams || (requiredIfParams = {}));
exports.requiredIfParams = requiredIfParams;
var paramMap = function (field, value, fields, ruleParam) {
    var retVal = {};
    retVal[requiredIfParams.field] = field;
    retVal[requiredIfParams.field_value] = value;
    retVal["params"] = [];
    while (ruleParam.length > 0) {
        var other_field = ruleParam.shift();
        var other_field_value = ruleParam.shift();
        var other_field_current_value = (0, get_wild_1.get)(fields, other_field);
        retVal["params"].push({
            field: other_field,
            value: other_field_value,
            current: other_field_current_value,
        });
    }
    return retVal;
};
exports.paramMap = paramMap;
