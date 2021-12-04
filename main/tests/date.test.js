var ReactFormValidation = require("../index.js");
var validator = new ReactFormValidation.default();
var fields = {
    startDate: "2021-12-03",
    endDate: "2021-12-04",
};
var errors = {};
validator.useGetFields(function () { return fields; });
validator.useSetError(function (errorList) { return (errors = errorList); });
validator.useRules({
    startDate: "before:endDate",
    endDate: "after:startDate",
});
validator.validateAll();
test("validate before and after", function () {
    expect(errors).toStrictEqual({});
});
