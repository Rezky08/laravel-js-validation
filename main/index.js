"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("./validators");
var values_1 = require("./values");
var get_wild_1 = require("get-wild");
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
    instanceValidation.prototype.useLabels = function (labels) {
        this.labels = labels;
    };
    instanceValidation.prototype.getField = function (fieldPath) {
        return (0, get_wild_1.get)(this.getFields(), fieldPath);
    };
    instanceValidation.prototype.getFields = function () {
        var _a, _b;
        return (_b = (_a = this.bind) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.fields;
    };
    instanceValidation.prototype.getRuleByField = function (fieldPath) {
        return this.rules[fieldPath];
    };
    instanceValidation.prototype.getRule = function (rule) {
        var onlyRule = rule === null || rule === void 0 ? void 0 : rule.split(":")[0];
        return onlyRule;
    };
    instanceValidation.prototype.getRuleParam = function (rule) {
        var onlyParam = rule === null || rule === void 0 ? void 0 : rule.split(":")[1];
        return onlyParam === null || onlyParam === void 0 ? void 0 : onlyParam.split(",");
    };
    instanceValidation.prototype.resolveValue = function (fieldPath, value, rule) {
        // require param
        var requireParam = values_1.ruleParamRequired[this.getRule(rule)];
        if (!!requireParam) {
            requireParam = values_1.paramMap[requireParam];
        }
        else {
            return {
                field: fieldPath,
                value: value,
            };
        }
        var requireParamFunction = requireParam.bind(this);
        return requireParamFunction(fieldPath, value, this.getFields(), this.getRuleParam(rule));
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
    instanceValidation.prototype.splitFieldPath = function (fieldPath) {
        return fieldPath
            .split(".*")
            .map(function (value) { return value.replace(/^\.+|\.+$/g, ""); });
    };
    instanceValidation.prototype.validateNestedWithIndex = function (fieldValue, keys, currentPaths, callback) {
        var _this = this;
        if (currentPaths === void 0) { currentPaths = []; }
        if (callback === void 0) { callback = function (fieldPath, value) { }; }
        var key = keys[0];
        keys = keys.slice(1);
        if (Array.isArray(fieldValue) && fieldValue.length > 0) {
            fieldValue.forEach(function (fieldElement, fieldKey) {
                var currentPath = key ? "".concat(fieldKey, ".").concat(key) : fieldKey.toString();
                _this.validateNestedWithIndex((0, get_wild_1.get)(fieldValue, currentPath), keys, __spreadArray(__spreadArray([], currentPaths, true), [currentPath], false), callback);
            });
        }
        else if (key) {
            currentPaths.push(key);
            this.validateNestedWithIndex((0, get_wild_1.get)(fieldValue, key), keys, currentPaths, callback);
        }
        else {
            var fieldPath = currentPaths.join(".");
            callback(fieldPath, fieldValue);
        }
    };
    instanceValidation.prototype.validateAll = function () {
        var _this = this;
        Object.entries(this.rules).forEach(function (_a) {
            var fieldPath = _a[0], fieldRules = _a[1];
            _this.validate(fieldPath, fieldRules);
        });
    };
    instanceValidation.prototype.validateProcess = function (fieldPath, fieldValue, rule, selectedRule) {
        fieldValue = this.resolveValue(fieldPath, fieldValue, rule);
        var result = (0, validators_1.validate)(fieldValue, selectedRule);
        this.resolveError(fieldPath, rule, result, fieldValue);
        return result;
    };
    instanceValidation.prototype.validate = function (fieldPath, rules) {
        var _this = this;
        var result = {
            valid: false,
            message: null,
        };
        var arrayRules = [];
        if (typeof rules == "string") {
            arrayRules = rules.split("|");
        }
        else {
            arrayRules = rules;
        }
        this.validateNestedWithIndex(this.getFields(), this.splitFieldPath(fieldPath), [], function (field, value) {
            return arrayRules.forEach(function (rule) {
                var selectedRule = validators_1.availableRules[_this.getRule(rule)];
                if (!!selectedRule) {
                    result = _this.validateProcess(field, value, rule, selectedRule);
                    console.log(field, value, rule, result.valid);
                }
            });
        });
        return result;
    };
    instanceValidation.prototype.eventHandler = function (e, fieldName, callback) {
        var node = e === null || e === void 0 ? void 0 : e.currentTarget;
        var field = fieldName !== null && fieldName !== void 0 ? fieldName : node === null || node === void 0 ? void 0 : node.getAttribute("name");
        var result = this.validate(field);
        if (typeof callback === "function") {
            callback(result);
        }
    };
    return instanceValidation;
}());
exports.default = instanceValidation;
