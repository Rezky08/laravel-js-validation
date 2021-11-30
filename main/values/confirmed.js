"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmedParams = exports.paramMap = void 0;
var confirmedParams;
(function (confirmedParams) {
    confirmedParams["value"] = "value";
    confirmedParams["value_confirmation"] = "value_confirmation";
})(confirmedParams || (confirmedParams = {}));
exports.confirmedParams = confirmedParams;
var paramMap = function (field, fields) {
    var retVal = {};
    retVal["value"] = fields[field];
    retVal["value_confirmation"] = fields["".concat(field, "_confirmation")];
    return retVal;
};
exports.paramMap = paramMap;
