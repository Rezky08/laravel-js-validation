var ReactFormValidation = require("../index.js");
var faker = require("faker");
faker.locale = "id_ID";
var validator = new ReactFormValidation.default();
var fields = {
    field: faker.name.findName(),
    field2: faker.name.findName(),
};
var errors = {};
validator.useGetFields(function () { return fields; });
validator.useSetError(function (errorList) { return (errors = errorList); });
validator.useRules({
    field: "required",
    field2: "required_if:field",
});
validator.validateAll();
test("validate required and required_if", function () {
    expect(errors).toStrictEqual({});
});
