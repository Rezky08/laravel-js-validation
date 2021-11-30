"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var messages_1 = require("../messages");
exports.default = (function (_a) {
    var field = _a.field, value = _a.value, value_confirmation = _a.value_confirmation;
    var isValid = value === value_confirmation;
    return {
        valid: isValid,
        message: isValid === false
            ? (0, messages_1.resolveMessage)(_1.availableRules.confirmed, { attribute: field })
            : null,
    };
});
