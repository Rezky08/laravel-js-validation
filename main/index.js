"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var messages_1 = require("./messages");
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
    instanceValidation.prototype.getRules = function () {
        // console.log(this.rules);
    };
    instanceValidation.prototype.resolveValue = function (field, rule) {
        var _a, _b;
        var fields = (_b = (_a = this.bind) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.fields;
        // require param
        var requireParam = values_1.ruleParamRequired[rule];
        if (!!requireParam) {
            requireParam = values_1.paramMap[requireParam];
        }
        else {
            return fields[field];
        }
        return requireParam(field, fields);
    };
    instanceValidation.prototype.resolveError = function (field, rule, validationResult) {
        if (!validationResult) {
            var message = (0, messages_1.resolveMessage)(rule, { attribute: field });
            this.errors[field] = message;
            this.setError(field, rule, message);
        }
    };
    instanceValidation.prototype.setError = function (field, rule, message) {
        if (typeof this.bind.setState === "function") {
            this.bind.setState({ errors: this.errors });
        }
    };
    instanceValidation.prototype.validate = function () {
        var _this = this;
        this.getRules();
        Object.entries(this.rules).forEach(function (_a) {
            var _b, _c;
            var key = _a[0], value = _a[1];
            if (typeof value === "string") {
                value = value.split("|");
            }
            var fieldValue = (_c = (_b = _this.bind) === null || _b === void 0 ? void 0 : _b.state) === null || _c === void 0 ? void 0 : _c.fields;
            fieldValue = fieldValue[key];
            value.forEach(function (rule) {
                var selectedRule = validators_1.availableRules[rule];
                if (!!selectedRule) {
                    fieldValue = _this.resolveValue(key, rule);
                    var result = (0, validators_1.validate)(fieldValue, selectedRule);
                    _this.resolveError(key, rule, result);
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
