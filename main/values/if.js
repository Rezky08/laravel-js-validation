"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifParams = exports.paramMap = void 0;
var get_wild_1 = require("get-wild");
var ifParams;
(function (ifParams) {
    ifParams["field"] = "field";
    ifParams["field_value"] = "value";
    ifParams["other_field"] = "other_field";
    ifParams["other_value"] = "other_value";
})(ifParams || (ifParams = {}));
exports.ifParams = ifParams;
var paramMap = function (field, value, fields, ruleParam) {
    var retVal = {};
    retVal[ifParams.field] = field;
    retVal[ifParams.field_value] = value;
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
