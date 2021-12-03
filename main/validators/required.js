"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var messages_1 = require("../messages");
var emptyList = [null, undefined, "", [], {}];
var validate = function (value) {
    return !emptyList.includes(value);
};
var validateArray = function (values) {
    switch (true) {
        case values.length <= 0:
            return false;
        case values.filter(function (value) { return !!!value; }).length > 0:
            return false;
        default:
            return true;
    }
};
exports.default = (function (_a) {
    var field = _a.field, value = _a.value;
    var isValid = true;
    if (Array.isArray(value)) {
        isValid = validateArray(value);
    }
    else {
        isValid = validate(value);
    }
    return {
        valid: isValid,
        message: isValid === false
            ? (0, messages_1.resolveMessage)(_1.availableRules.required, { attribute: field })
            : null,
    };
});
