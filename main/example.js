"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = __importDefault(require("./index.js"));
var validationTest = /** @class */ (function () {
    function validationTest() {
        this.state = {
            fields: {
                name: "2",
                password: "abc",
                password_confirmation: "abc",
                start_date: "",
                end_date: "",
            },
            errors: {},
        };
        this.instanceValidation = new index_js_1.default(this);
        this.instanceValidation.useRules({
            name: "required|filled",
            password: ["required", "confirmed"],
            password_confirmation: ["required"],
            start_date: ["required"],
            end_date: ["required_if:name,2"],
        });
        // this.instanceValidation.validateAll();
    }
    validationTest.prototype.setState = function (state) {
        this.state = __assign(__assign({}, this.state), state);
    };
    validationTest.prototype.render = function () {
        this.instanceValidation.eventHandler(undefined, "start_date");
    };
    return validationTest;
}());
var validator = new validationTest();
validator.render();
console.log(validator.state.errors);
