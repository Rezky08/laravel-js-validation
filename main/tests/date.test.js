var ReactFormValidation = require("../index.js");
var validator = new ReactFormValidation.default();
var fields = {};
var errors = {};
validator.useGetFields(function () { return fields; });
validator.useSetError(function (errorList) { return (errors = errorList); });
test("validate SUCCESS before and after", function () {
    fields = {
        startDate: "2021-12-03",
        endDate: "2021-12-04",
    };
    validator.useRules({
        startDate: "before:endDate",
        endDate: "after:startDate",
    });
    validator.validateAll();
    expect(errors).toStrictEqual({});
});
test("validate FAIL before and after", function () {
    validator.useRules({
        startDate: "before:endDate",
        endDate: "after:startDate",
    });
    fields = {
        startDate: "2021-12-04",
        endDate: "2021-12-04",
    };
    validator.validateAll();
    Object.entries(fields).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        expect(errors).toHaveProperty(key);
    });
    fields = {
        startDate: "2021-12-05",
        endDate: "2021-12-04",
    };
    validator.validateAll();
    Object.entries(fields).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        expect(errors).toHaveProperty(key);
    });
});
test("validate before or equal & after or equal", function () {
    fields = {
        startDate: "2021-12-04",
        endDate: "2021-12-04",
    };
    validator.useRules({
        startDate: "before_or_equal:endDate",
        endDate: "after_or_equal:startDate",
    });
    validator.validateAll();
    expect(errors).toStrictEqual({});
});
test("validate FAIL before or equal & after or equal", function () {
    validator.useRules({
        startDate: "before_or_equal:endDate",
        endDate: "after_or_equal:startDate",
    });
    fields = {
        startDate: "2021-12-05",
        endDate: "2021-12-04",
    };
    validator.validateAll();
    Object.entries(fields).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        expect(errors).toHaveProperty(key);
    });
});
