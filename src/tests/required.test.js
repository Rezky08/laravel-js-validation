const ReactFormValidation = require("../index.js");
const faker = require("faker");
faker.locale = "id_ID";

const validator = new ReactFormValidation.default();
let fields = {
  field: faker.name.findName(),
  field2: faker.name.findName(),
};
let errors = {};

validator.useGetFields(() => fields);
validator.useSetError((errorList) => (errors = errorList));
validator.useRules({
  field: "required",
  field2: "required_if:field",
});

validator.validateAll();

test("validate required and required_if", () => {
  expect(errors).toStrictEqual({});
});
