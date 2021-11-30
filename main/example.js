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
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./index.js");
var validationTest = /** @class */ (function () {
    function validationTest() {
        this.state = {
            fields: {
                name: "test",
                password: "abc",
                password_confirmation: "abc",
                start_date: "",
                end_date: new Date(),
            },
            errors: {},
        };
        var instanceValidation = new index_js_1.default(this);
        instanceValidation.useRules({
            name: "required|filled",
            password: ["required", "confirmed"],
            password_confirmation: ["required"],
            start_date: ["required"],
            end_date: ["required"],
        });
        instanceValidation.validate();
        this.setState({ fields: __assign(__assign({}, this.state.fields), { start_date: new Date() }) });
        instanceValidation.validate();
        console.log(this.state.errors);
    }
    validationTest.prototype.setState = function (state) {
        this.state = __assign(__assign({}, this.state), state);
    };
    return validationTest;
}());
new validationTest();
