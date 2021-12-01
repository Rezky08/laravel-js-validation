"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmedParams = exports.paramMap = void 0;
var get_wild_1 = require("get-wild");
var confirmedParams;
(function (confirmedParams) {
    confirmedParams["value"] = "value";
    confirmedParams["value_confirmation"] = "value_confirmation";
})(confirmedParams || (confirmedParams = {}));
exports.confirmedParams = confirmedParams;
var paramMap = function (field, value, fields) {
    var retVal = {};
    retVal["field"] = field;
    retVal["value"] = value;
    retVal["value_confirmation"] = (0, get_wild_1.get)(fields, "".concat(field, "_confirmation"));
    return retVal;
};
exports.paramMap = paramMap;
