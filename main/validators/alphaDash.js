"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var messages_1 = require("../messages");
exports.default = (function (_a) {
    var field = _a.field, value = _a.value;
    var isValid = /^[a-zA-Z0-9\_\-]+$/.test(value);
    return {
        valid: isValid,
        message: isValid === false
            ? (0, messages_1.resolveMessage)(_1.availableRules.alpha_dash, { attribute: field })
            : null,
    };
});
