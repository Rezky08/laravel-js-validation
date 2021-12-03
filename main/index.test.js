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
var ReactFormValidation = require("./index.js");
var faker = require("faker");
faker.locale = "id_ID";
var validationTest = /** @class */ (function () {
    function validationTest() {
        var _this = this;
        this.state = {
            fields: {
                name: faker.name.findName(),
                password: faker.random.alphaNumeric(12),
                status: true,
                address: faker.address.streetAddress(true),
                isPrimaryAddress: true,
                startDate: new Date("2021-12-05"),
                endDate: new Date("2021-12-04"),
            },
            errors: {},
            rules: {
                name: "required",
                password: ["required", "confirmed"],
                status: ["required", "accepted"],
                address: ["required_if:status,true"],
                isPrimaryAddress: ["required_if:address", "accepted_if:status"],
                startDate: ["after:endDate"],
            },
        };
        this.state.fields["password_confirmation"] = this.state.fields.password;
        this.instanceValidation = new ReactFormValidation.default(this);
        test("Instantiate Test", function () {
            expect(_this.instanceValidation.constructor.name).toBe("instanceValidation");
        });
        this.instanceValidation.useRules(this.state.rules);
        test("Assign Rules", function () {
            expect(Object.entries(_this.instanceValidation.rules).length).toBe(Object.entries(_this.state.rules).length);
        });
        Object.keys(this.instanceValidation.rules).forEach(function (rule) {
            test("Rule [".concat(rule, "] was assigned"), function () {
                expect(Object.keys(_this.state.rules).includes(rule)).toBe(true);
            });
        });
    }
    validationTest.prototype.setState = function (state) {
        this.state = __assign(__assign({}, this.state), state);
    };
    validationTest.prototype.render = function () {
        var _this = this;
        this.instanceValidation.validateAll();
        test("Validation has no errors", function () {
            expect(Object.keys(_this.state.errors).length).toBe(0);
        });
        console.log(this.state.errors);
        // this.instanceValidation.validateAll("password");
    };
    return validationTest;
}());
var validator = new validationTest();
validator.render();
