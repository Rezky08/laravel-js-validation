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
                status: false,
                password: "abc",
                password_confirmation: "abc",
                start_date: new Date(),
                end_date: new Date(),
                nested: {
                    nestedV1: "test",
                },
                nestedArrayObjectEmpty: [],
                nestedArrayObject: [
                    {
                        name: "",
                        point: 1,
                    },
                    {
                        name: "test",
                        point: 1,
                    },
                    {
                        name: "test",
                        point: 1,
                    },
                ],
                nestedArrayObjectNested: [
                    {
                        nested: [
                            {
                                name: "",
                                point: 1,
                            },
                            {
                                name: "test",
                                point: 1,
                            },
                            {
                                name: "test",
                                point: 1,
                            },
                        ],
                    },
                    {
                        nested: [
                            {
                                name: "",
                                point: 1,
                            },
                            {
                                name: "test",
                                point: 1,
                            },
                            {
                                name: "test",
                                point: 1,
                            },
                        ],
                    },
                ],
            },
            errors: {},
        };
        this.instanceValidation = new index_js_1.default(this);
        this.instanceValidation.useRules({
            name: "required|filled",
            status: ["accepted_if:password,abc"],
            password: ["required", "confirmed"],
            password_confirmation: ["required"],
            start_date: ["required"],
            end_date: ["required_if:name,2"],
            "nestedArrayObjectEmpty.*": ["required"],
            "nestedArrayObjectNested.*.nested.*": ["required"],
            "nestedArrayObjectNested.*.nested.*.name": ["required_if:status,false"],
        });
        this.instanceValidation.useLabels({
            status: "Status",
            nestedArrayObjectNested: {
                nested: {
                    name: {
                        fieldLabel: "Nested Object",
                    },
                },
            },
        });
        // this.instanceValidation.validateAll();
    }
    validationTest.prototype.setState = function (state) {
        this.state = __assign(__assign({}, this.state), state);
    };
    validationTest.prototype.render = function () {
        // console.log(this.instanceValidation.getField("nestedArrayObject.*.name"));
        // this.instanceValidation.validateAll("password");
        this.instanceValidation.eventHandler({}, "nestedArrayObjectNested.*.nested.1.name");
        console.log(this.state.errors);
    };
    return validationTest;
}());
var validator = new validationTest();
validator.render();
