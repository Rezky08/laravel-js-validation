const ReactFormValidation = require("../index.js");

const validator = new ReactFormValidation.default();
let fields = {
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

fields = {
  startDate: "2021-12-04",
  endDate: "2021-12-04",
};

validator.useRules({
  startDate: "before_or_equal:endDate",
  endDate: "after_or_equal:startDate",
});

validator.validateAll();

test("validate before or equal & after or equal", () => {
  expect(errors).toStrictEqual({});
});
