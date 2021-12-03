"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var messages_1 = require("../messages");
var date_1 = __importDefault(require("./date"));
var dateValidation = function (_a) {
    var _b;
    var field = _a.field, value = _a.value, param = _a.param;
    // date validation
    var isDateValid = (0, date_1.default)({ field: field, value: value });
    if (!isDateValid.valid) {
        return isDateValid;
    }
    isDateValid = (0, date_1.default)({
        field: (_b = param.field) !== null && _b !== void 0 ? _b : "".concat(field, ".").concat(_1.availableRules.after_or_equal),
        value: param.value,
    });
    return isDateValid;
};
exports.default = (function (props) {
    var _a;
    var field = props.field, value = props.value, param = props.param;
    var isDateValid = dateValidation(props);
    if (!isDateValid.valid) {
        return isDateValid;
    }
    var isValid = value >= (param === null || param === void 0 ? void 0 : param.value);
    return {
        valid: isValid,
        message: isValid === false
            ? (0, messages_1.resolveMessage)(_1.availableRules.after_or_equal, {
                attribute: field,
                date: (_a = param.field) !== null && _a !== void 0 ? _a : param.value,
            })
            : null,
    };
});
