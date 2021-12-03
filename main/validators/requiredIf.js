"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var messages_1 = require("../messages");
var required_1 = __importDefault(require("./required"));
exports.default = (function (_a) {
    var field = _a.field, value = _a.value, params = _a.params;
    var isValid = true;
    var field_value = value;
    var other = null;
    var other_value = null;
    for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
        var param = params_1[_i];
        var value_1 = param.value, current = param.current;
        if (value_1 ? value_1 === current : !!current) {
            var requiredIsValid = (0, required_1.default)({ field: field, value: field_value });
            if (!requiredIsValid.valid) {
                other = param.field;
                other_value = value_1 ? param.value : "exist";
                isValid = false;
                break;
            }
        }
    }
    return {
        valid: isValid,
        message: isValid === false
            ? (0, messages_1.resolveMessage)(_1.availableRules.required_if, {
                attribute: field,
                other: other,
                value: other_value,
            })
            : null,
    };
});
