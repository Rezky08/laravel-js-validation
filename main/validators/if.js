"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var messages_1 = require("../messages");
exports.default = (function (props, rule, validationCallback, castCallback) {
    var _a;
    if (validationCallback === void 0) { validationCallback = function (value) { }; }
    if (castCallback === void 0) { castCallback = function (value) { }; }
    var field = props.field, value = props.value, params = props.params;
    var isValid = true;
    var field_value = value;
    var other = null;
    var other_value = null;
    for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
        var param = params_1[_i];
        var value_1 = param.value, current = param.current;
        var valueCasted = (_a = castCallback(value_1)) !== null && _a !== void 0 ? _a : value_1;
        if (valueCasted ? valueCasted === current : !!current) {
            var callbackIsValid = validationCallback(props);
            if (!callbackIsValid.valid) {
                other = param.field;
                other_value = valueCasted ? param.value : "exist";
                isValid = false;
                break;
            }
        }
    }
    return {
        valid: isValid,
        message: isValid === false
            ? (0, messages_1.resolveMessage)(rule, {
                attribute: field,
                other: other,
                value: other_value,
            })
            : null,
    };
});
