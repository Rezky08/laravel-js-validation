const ReactFormValidation = require("../index.js");

const validator = new ReactFormValidation.default();
const fields = {
  startDate: "2021-12-03",
  endDate: "2021-12-04",
};
let errors = {};

validator.useGetFields(() => fields);
validator.useSetError((errorList) => (errors = errorList));
validator.useRules({
  startDate: "before:endDate",
  endDate: "after:startDate",
});

validator.validateAll();

test("validate before and after", () => {
  expect(errors).toStrictEqual({});
});
