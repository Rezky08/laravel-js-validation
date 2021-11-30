"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("./validators");
var values_1 = require("./values");
var instanceValidation = /** @class */ (function () {
    function instanceValidation(bind, fieldsName) {
        if (fieldsName === void 0) { fieldsName = "fields"; }
        this.bind = bind;
        this.fieldsName = fieldsName;
        this.errors = {};
        this.messages = {};
    }
    instanceValidation.prototype.useRules = function (rules) {
        this.rules = rules;
    };
    instanceValidation.prototype.useMessages = function (messages) {
        this.messages = messages;
    };
    instanceValidation.prototype.getRule = function (rule) {
        var onlyRule = rule === null || rule === void 0 ? void 0 : rule.split(":")[0];
        return onlyRule;
    };
    instanceValidation.prototype.getRuleParam = function (rule) {
        var onlyParam = rule === null || rule === void 0 ? void 0 : rule.split(":")[1];
        return onlyParam === null || onlyParam === void 0 ? void 0 : onlyParam.split(",");
    };
    instanceValidation.prototype.resolveValue = function (field, rule) {
        var _a, _b;
        var fields = (_b = (_a = this.bind) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.fields;
        // require param
        var requireParam = values_1.ruleParamRequired[this.getRule(rule)];
        if (!!requireParam) {
            requireParam = values_1.paramMap[requireParam];
        }
        else {
            return {
                field: field,
                value: fields[field],
            };
        }
        return requireParam(field, fields, this.getRuleParam(rule));
    };
    instanceValidation.prototype.resolveError = function (field, rule, validationResult, fieldValue) {
        if (!validationResult.valid) {
            this.errors[field] = validationResult.message;
            this.setError(field, rule, validationResult.message);
        }
        else {
            delete this.errors[field];
            this.setError(null, null, "unset");
        }
    };
    instanceValidation.prototype.setError = function (field, rule, message) {
        if (typeof this.bind.setState === "function") {
            this.bind.setState({ errors: this.errors });
        }
    };
    instanceValidation.prototype.validate = function () {
        var _this = this;
        Object.entries(this.rules).forEach(function (_a) {
            var _b, _c;
            var key = _a[0], value = _a[1];
            if (typeof value === "string") {
                value = value.split("|");
            }
            var fieldValue = (_c = (_b = _this.bind) === null || _b === void 0 ? void 0 : _b.state) === null || _c === void 0 ? void 0 : _c.fields;
            fieldValue = fieldValue[key];
            value.forEach(function (rule) {
                var selectedRule = validators_1.availableRules[_this.getRule(rule)];
                if (!!selectedRule) {
                    fieldValue = _this.resolveValue(key, rule);
                    var result = (0, validators_1.validate)(fieldValue, selectedRule);
                    _this.resolveError(key, rule, result, fieldValue);
                }
            });
        });
        return false;
    };
    instanceValidation.prototype.blurEventHandler = function () {
        this.validate();
    };
    return instanceValidation;
}());
exports.default = instanceValidation;
