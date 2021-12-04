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
fields = {
    startDate: "2021-12-04",
    endDate: "2021-12-04",
};
validator.useRules({
    startDate: "before_or_equal:endDate",
    endDate: "after_or_equal:startDate",
});
validator.validateAll();
test("validate before or equal & after or equal", function () {
    expect(errors).toStrictEqual({});
});
