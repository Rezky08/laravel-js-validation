"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var messages_1 = require("../messages");
var allowTypes = [typeof {}, typeof []];
var validateNested = function (field, fields) { };
var returnValue = function (field, isValid) {
    return {
        valid: isValid,
        message: isValid === false
            ? (0, messages_1.resolveMessage)(_1.availableRules.array, {
                attribute: field,
            })
            : null,
    };
};
exports.default = (function (_a) {
    var field = _a.field, value = _a.value, params = _a.params;
    var isValid = true;
    if (!allowTypes.includes(typeof value)) {
        isValid = false;
        return returnValue(field, isValid);
    }
    if (!!!params) {
        return returnValue(field, isValid);
    }
    var valueKeys = Array.isArray(value)
        ? value.map(function (_a) {
            var key = _a[0], value = _a[1];
            return key;
        })
        : Object.keys(value);
    for (var _i = 0, valueKeys_1 = valueKeys; _i < valueKeys_1.length; _i++) {
        var key = valueKeys_1[_i];
        if (!params.includes(key)) {
            isValid = false;
            return returnValue(field, isValid);
        }
    }
});
