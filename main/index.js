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
    instanceValidation.prototype.getFields = function () {
        var _a, _b;
        return (_b = (_a = this.bind) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.fields;
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
    instanceValidation.prototype.validateAll = function () {
        var _this = this;
        Object.entries(this.rules).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            _this.validate(key, value);
        });
    };
    instanceValidation.prototype.validate = function (field, value) {
        var _this = this;
        var result = {
            valid: false,
            message: null,
        };
        if (typeof value === "string") {
            value = value.split("|");
        }
        var fieldValue = this.getFields();
        fieldValue = fieldValue[field];
        value === null || value === void 0 ? void 0 : value.forEach(function (rule) {
            var selectedRule = validators_1.availableRules[_this.getRule(rule)];
            if (!!selectedRule) {
                fieldValue = _this.resolveValue(field, rule);
                result = (0, validators_1.validate)(fieldValue, selectedRule);
                _this.resolveError(field, rule, result, fieldValue);
            }
        });
        return result;
    };
    instanceValidation.prototype.eventHandler = function (e, fieldName, callback) {
        var node = e === null || e === void 0 ? void 0 : e.currentTarget;
        var field = fieldName !== null && fieldName !== void 0 ? fieldName : node === null || node === void 0 ? void 0 : node.getAttribute("name");
        var rule = this.rules[field];
        var result = this.validate(field, rule);
        if (typeof callback === "function") {
            callback(result);
        }
    };
    return instanceValidation;
}());
exports.default = instanceValidation;
